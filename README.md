# Gabriel Nguyen — portfolio site

Static one-page landing page inspired by [Bjorn Melin’s site](https://bjornmelin.io/) and rebuilt with a Swiss/International, typography-first system. Content reflects [Gabriel’s GitHub profile and repositories](https://github.com/gabrielnguyen2603?tab=repositories).

## Deploy on GitHub Pages

### Option A — User site (`https://gabrielnguyen2603.github.io/`)

1. On GitHub, create a **public** repository named **`gabrielnguyen2603.github.io`** (exact name, under user `gabrielnguyen2603`).
2. Push this folder as the default branch (usually `main`):

   ```bash
   cd "C:\Users\nguye\Downloads\Portfolio"
   git init
   git add .
   git commit -m "Add Decision Briefing Studio portfolio"
   git branch -M main
   git remote add origin https://github.com/gabrielnguyen2603/gabrielnguyen2603.github.io.git
   git push -u origin main
   ```

3. In the repo on GitHub: **Settings → Pages → Build and deployment → Source**: **Deploy from a branch**, branch **`main`**, folder **`/ (root)`**, then Save.
4. After a minute or two, the site is available at **https://gabrielnguyen2603.github.io/**

### Option B — Project site (`https://gabrielnguyen2603.github.io/<repo-name>/`)

1. Create any repo (e.g. `portfolio`) and push the same files to `main`.
2. Enable Pages from **`main`** / **`/ (root)`** as above.
3. Open **https://gabrielnguyen2603.github.io/portfolio/** (replace `portfolio` with your repo name).  
   This project uses **relative** asset URLs, so it works under a subpath without extra build configuration.

## Customize

- **Projects**: edit `projects-data.js` (titles, descriptions, tags, GitHub URLs).
- **Copy / sections**: edit `index.html`.
- **Look and feel**: edit `styles.css` (CSS variables at the top for colors and fonts).

No Node.js or build step is required.
