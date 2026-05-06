// Legacy compatibility entrypoint.
// Keeps old HTML references working after renaming main script to app.js.
(function () {
  var script = document.createElement("script");
  script.src = "app.js";
  document.head.appendChild(script);
})();
