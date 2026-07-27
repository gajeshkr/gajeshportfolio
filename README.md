# Portfolio Website (React + Vite)

A single-page portfolio: Hero, About, Skills, Projects, Contact — built to be
easy to update as you add real content later.

## Run it locally

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (usually http://localhost:5173).

## Build for deployment

```bash
npm run build
```

This creates a `dist/` folder you can deploy anywhere static (Vercel,
Netlify, GitHub Pages, etc.).

## Where to edit things

You almost never need to touch the component files. Everything you'll
change regularly lives in `src/data/`:

- `src/data/profile.js` — your name, role, tagline, about text, email,
  social links, resume link.
- `src/data/skills.js` — your skill groups and items.
- `src/data/projects.js` — your projects (title, description, tags,
  image, live link, code link).

## Adding project/profile images

1. Drop image files into `src/assets/` (e.g. `src/assets/project1.png`).
2. In `src/components/Projects.jsx`, import it at the top:
   ```js
   import project1 from '../assets/project1.png'
   ```
3. In `src/data/projects.js`, set `image: project1` for that project
   (import it there instead, since that's where the data lives — or pass
   the image path directly if you keep images in `public/`).

Simplest option: put images in the `public/` folder instead (e.g.
`public/project1.png`) and reference them as `image: '/project1.png'` in
`src/data/projects.js` — no import needed.

## Project structure

```
portfolio/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx          # React entry point
    ├── App.jsx           # assembles the single home page
    ├── index.css         # all styles (design tokens at the top)
    ├── data/
    │   ├── profile.js    # name, tagline, about, contact, socials
    │   ├── skills.js     # skill groups
    │   └── projects.js   # your projects
    ├── assets/           # put images here
    └── components/
        ├── Nav.jsx
        ├── Hero.jsx
        ├── About.jsx
        ├── Skills.jsx
        ├── Projects.jsx
        ├── Contact.jsx
        └── Footer.jsx
```

## Sharing your portfolio link

The Contact section has a "copy link" button that copies whatever URL the
site is deployed at — handy once you deploy it, so you can grab the link
and send it to anyone who asks for your portfolio.
