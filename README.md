# Portfolio — Dhananjay Nautiyal

Live: **https://dhananjay-nautiyal.github.io/portfolio**

Static site, plain HTML/CSS/JS, no build step. Animated edition inspired by the
Hero + Mouse + Scroll + Background demo styles (all effects written from scratch).

## Demo options

| Option | Style | Status |
| ------ | ----- | ------ |
| A — Hero + Mouse + Scroll (Recommended, current) | Preloader, cursor glow, canvas net, masked hero entrance, reveals, marquee, tilt, counters | ✅ Live |
| B — WebGL / 3D | Same content, animated gradient-mesh hero + heavier 3D card stage | Available on request |
| C — Text-focused | Big kinetic typography hero, per-letter stagger, minimal background | Available on request |
| D — Light minimal | Clean white version of option A, same sections | Available on request |

Say `switch to B/C/D` and the site is rebuilt in that style.

## Files

- `index.html` — content + animation hooks (`#loader`, `#cDot`, `#cGlow`, `#bgNet`, `data-reveal`, `.tilt`, `.magnetic`)
- `styles.css` — dark glass theme + all keyframes/transitions
- `script.js` — preloader, cursor, canvas net, reveals, typing, counters, magnetic, tilt, progress
- `resume.pdf` — placeholder resume (replace with the real one, keep the name)
- `README.md` — this file

## Preview locally

```bash
cd portfolio
python3 -m http.server 8080
# open http://localhost:8080/
```

## Customize

- Colors: `:root` variables in `styles.css` (`--cyan`, `--violet`, `--bg`)
- Roles typed in hero: `roles` array in `script.js`
- Stats: `<b data-count="N">` in `index.html`
- Reduce motion: `prefers-reduced-motion` is respected automatically

## Replace the resume

Overwrite `resume.pdf` with your real resume (keep the same file name —
the Download Resume buttons save it as `dhananjay nautiyal.pdf`).

## Deploy

Push to `main` — GitHub Pages (root) rebuilds `dhananjay-nautiyal.github.io/portfolio` in ~1 min.
