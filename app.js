(function () {
  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");
  var yearEl = document.getElementById("year");
  var grid = document.getElementById("project-grid");
  var categoryFilter = document.getElementById("category-filter");
  var presetToggle = document.getElementById("preset-toggle");
  var contactForm = document.getElementById("contact-form");
  var contactNote = document.getElementById("contact-note");
  var STORAGE_KEY = "gn-portfolio-theme";
  var PRESET_KEY = "gn-portfolio-preset";
  var projectPreset = "featured";
  var navSwitches = document.querySelectorAll(".navswitch[data-switch]");
  var switchers = document.querySelectorAll("[data-switch]");
  var panels = document.querySelectorAll("[data-panel]");

  function getPreferredTheme() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "light" || stored === "dark") return stored;
    } catch (e) {}
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (toggle) toggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {}
  }

  applyTheme(getPreferredTheme());

  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
    });
  }

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  function setContactNote(text) {
    if (!contactNote) return;
    contactNote.textContent = text || "";
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function uniqueCategories(items) {
    var map = {};
    items.forEach(function (item) {
      if (item && item.category) map[item.category] = true;
    });
    return Object.keys(map).sort();
  }

  function hydrateFilter(items) {
    if (!categoryFilter) return;
    var allCategories = uniqueCategories(items);
    categoryFilter.innerHTML =
      '<option value="all">All categories</option>' +
      allCategories
        .map(function (cat) {
          return '<option value="' + escapeHtml(cat) + '">' + escapeHtml(cat) + "</option>";
        })
        .join("");
  }

  function getStoredPreset() {
    try {
      var stored = localStorage.getItem(PRESET_KEY);
      if (stored === "featured" || stored === "all") return stored;
    } catch (e) {}
    return "featured";
  }

  function updatePresetButton() {
    if (!presetToggle) return;
    presetToggle.textContent =
      projectPreset === "featured" ? "Dynamic preset: Featured" : "Dynamic preset: All projects";
  }

  function syncFilterForPreset() {
    if (!categoryFilter) return;
    if (projectPreset === "all") {
      categoryFilter.value = "all";
      categoryFilter.disabled = true;
      categoryFilter.setAttribute("aria-disabled", "true");
    } else {
      categoryFilter.disabled = false;
      categoryFilter.setAttribute("aria-disabled", "false");
    }
  }

  function filteredProjects(items) {
    var next = items.slice();
    var category = categoryFilter ? categoryFilter.value : "all";
    if (projectPreset === "featured") {
      next = next.filter(function (item) {
        return !!item.featured;
      });
    } else {
      category = "all";
    }
    if (category && category !== "all") {
      next = next.filter(function (item) {
        return item.category === category;
      });
    }
    return next;
  }

  function renderProjects() {
    if (!grid || !window.PORTFOLIO_PROJECTS) return;
    var items = filteredProjects(window.PORTFOLIO_PROJECTS);
    items.sort(function (a, b) {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return String(a.updated).localeCompare(String(b.updated), undefined, { numeric: true });
    });

    if (!items.length) {
      grid.innerHTML = '<article class="project-card"><p class="project-desc">No projects match this filter yet. Try another category or preset.</p></article>';
      return;
    }

    grid.innerHTML = items
      .map(function (p) {
        var featured = p.featured
          ? '<span class="project-badge project-badge-featured">Featured</span>'
          : '<span class="project-badge">' + escapeHtml(p.category) + "</span>";
        var stars =
          typeof p.stars === "number"
            ? '<span class="project-stars" title="GitHub stars">' + p.stars + " ★</span>"
            : "";
        var bullets = (p.bullets || [])
          .map(function (b) {
            return "<li>" + escapeHtml(b) + "</li>";
          })
          .join("");
        var tags = (p.tags || [])
          .map(function (t) {
            return '<span class="tech-pill">' + escapeHtml(t) + "</span>";
          })
          .join("");

        var liveBtn = p.live
          ? '<a class="btn btn-small btn-ghost" href="' +
            escapeHtml(p.live) +
            '" target="_blank" rel="noopener noreferrer">Live</a>'
          : "";

        return (
          '<article class="project-card">' +
          '<div class="project-card-top">' +
          featured +
          '<span class="project-lang">' +
          escapeHtml(p.language) +
          "</span>" +
          "</div>" +
          '<h3 class="project-title"><a href="' +
          escapeHtml(p.github) +
          '" target="_blank" rel="noopener noreferrer">' +
          escapeHtml(p.title) +
          "</a></h3>" +
          '<p class="project-desc">' +
          escapeHtml(p.description) +
          "</p>" +
          (bullets ? "<ul class=\"project-bullets\">" + bullets + "</ul>" : "") +
          '<div class="project-tags">' +
          tags +
          "</div>" +
          '<div class="project-meta">' +
          stars +
          '<span class="project-updated">Updated ' +
          escapeHtml(p.updated || "") +
          "</span>" +
          "</div>" +
          '<div class="project-actions">' +
          '<a class="btn btn-small btn-primary" href="' +
          escapeHtml(p.github) +
          '" target="_blank" rel="noopener noreferrer">Open</a>' +
          liveBtn +
          "</div>" +
          "</article>"
        );
      })
      .join("");
  }

  if (window.PORTFOLIO_PROJECTS) {
    hydrateFilter(window.PORTFOLIO_PROJECTS);
  }

  projectPreset = getStoredPreset();
  updatePresetButton();
  syncFilterForPreset();
  renderProjects();

  if (categoryFilter) {
    categoryFilter.addEventListener("change", renderProjects);
  }

  if (presetToggle) {
    presetToggle.addEventListener("click", function () {
      projectPreset = projectPreset === "featured" ? "all" : "featured";
      updatePresetButton();
      syncFilterForPreset();
      try {
        localStorage.setItem(PRESET_KEY, projectPreset);
      } catch (e) {}
      renderProjects();
    });
  }

  function setActiveSwitch(id) {
    if (!navSwitches || !navSwitches.length) return;
    navSwitches.forEach(function (btn) {
      btn.classList.toggle("is-active", btn.getAttribute("data-switch") === id);
    });
  }

  function scrollToPanel(id) {
    var target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSwitch(id);
    try {
      history.replaceState(null, "", "#" + encodeURIComponent(id));
    } catch (e) {}
  }

  function initSwitchButtons() {
    if (!switchers || !switchers.length) return;
    switchers.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-switch");
        if (!id) return;
        scrollToPanel(id);
      });
    });
  }

  function initPanelObserver() {
    if (!("IntersectionObserver" in window) || !panels.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        var visible = entries
          .filter(function (e) {
            return e.isIntersecting;
          })
          .sort(function (a, b) {
            return b.intersectionRatio - a.intersectionRatio;
          })[0];
        if (!visible) return;
        var id = visible.target.getAttribute("data-panel") || visible.target.id;
        if (id) setActiveSwitch(id);
      },
      { root: null, threshold: [0.2, 0.35, 0.5], rootMargin: "-20% 0px -55% 0px" }
    );

    panels.forEach(function (p) {
      observer.observe(p);
    });
  }

  function initInitialHash() {
    var hash = (window.location.hash || "").replace("#", "");
    if (!hash) return;
    try {
      hash = decodeURIComponent(hash);
    } catch (e) {}
    if (document.getElementById(hash)) {
      setTimeout(function () {
        scrollToPanel(hash);
      }, 0);
    }
  }

  function initContactForm() {
    if (!contactForm) return;

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      setContactNote("");

      var data = new FormData(contactForm);
      var name = String(data.get("name") || "").trim();
      var email = String(data.get("email") || "").trim();
      var message = String(data.get("message") || "").trim();

      if (!name || !email || !message) {
        setContactNote("Please fill in all fields.");
        return;
      }

      var subject = "Portfolio inquiry — " + name;
      var body =
        "Name: " +
        name +
        "\nEmail: " +
        email +
        "\n\nMessage:\n" +
        message +
        "\n\n— Sent from the portfolio contact form";

      var mailto =
        "mailto:gabrielnguyen2603@gmail.com" +
        "?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);

      window.location.href = mailto;
      setContactNote("Opening your email client…");
    });
  }

  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("reveal-in");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14 }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("reveal-in");
    });
  }

  initSwitchButtons();
  initPanelObserver();
  initInitialHash();
  initContactForm();
})();
