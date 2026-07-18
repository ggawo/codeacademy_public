# Alex's Corner (Example Capstone — Reference Only)

This is a finished, checklist-complete example capstone project, built to
show what a full, polished, "ready to deploy" student site looks like —
multiple real sections, several working JS features, and a design system
that feels intentional rather than templated. **Don't copy this topic or
design** — use it to see the level of finish and functionality to aim for,
then build something that's actually your own.

## Sections
1. **Hero** — headline, subtext, two calls to action, layered background glow
2. **About** — bio text + a stat grid (years playing guitar, games played, etc.)
3. **Skills** — animated progress bars that fill in as you scroll to them
4. **Interests** — tilted "scrapbook" cards with tag pills
5. **Gallery** — a photo grid that opens a lightbox modal on click
6. **Favorites** — a ranked ordered list
7. **Interactive** — a random fun-fact button
8. **Contact** — a validated contact form + social icon links
9. **Footer** — multi-column layout with its own nav and a back-to-top link

## JavaScript Features (7 total)
| # | Feature | What it demonstrates |
|---|---|---|
| 1 | Mobile nav toggle | `classList.toggle`, `aria-expanded` |
| 2 | Scroll-spy nav highlighting | `IntersectionObserver`, dynamic `classList` |
| 3 | Scroll-reveal animations | `IntersectionObserver`, CSS transitions |
| 4 | Gallery lightbox | dynamic content, `Escape`/backdrop-click handling |
| 5 | Random fun fact | arrays, `Math.random()` |
| 6 | Contact form validation | `event.preventDefault()`, form state, `aria-live` status |
| 7 | Back-to-top button | scroll event, conditional visibility |

None of these require a backend or a framework — they're the same
`querySelector` / `addEventListener` / `classList` toolkit from Weeks 5 and 6,
just applied several times across a real page instead of once.

## Deployment-Realistic Details
- A real `<title>`, meta description, and Open Graph tags for social sharing
- An SVG favicon
- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- Accessibility basics: a skip link, visible keyboard focus states,
  `aria-label`/`aria-expanded`/`aria-live` where relevant, and
  `prefers-reduced-motion` support
- A responsive layout that reflows all the way down to a small phone width

## Folder Structure
```
example_project/
├── index.html
├── style.css
├── script.js
├── favicon.svg
├── images/
│   ├── alex-photo.jpg
│   ├── guitar.jpg / chess.jpg / coding.jpg
│   └── gallery-1.jpg … gallery-6.jpg
└── README.md
```

## Notes on the Placeholder Images
The images in `images/` are generated gradient placeholders standing in for
real photos, so this example stays self-contained. When you build your own
project, replace placeholders like these with real photos or graphics you
have the right to use, and always write specific, descriptive `alt` text —
notice none of the `alt` attributes here just say "image."

## If You Wanted to Deploy This
This project is a static site (no build step, no server-side code — the
contact form doesn't actually send email, it just validates and confirms),
so it's ready for GitHub Pages as-is:
1. Push the folder to a GitHub repository.
2. In the repo's Settings → Pages, set the source to the `main` branch, root folder.
3. GitHub gives you a live URL a minute or two later.

Week 8 covers this process — including optimizing images and going live — in
full detail for your own project.
