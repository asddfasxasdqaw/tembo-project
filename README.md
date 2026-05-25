# Skillforge

Landing page for Skillforge — a library of drop-in `.md` / `.txt` skills that turn any frontier AI model (Claude, GPT, Gemini, Codex, Kimi, …) into a production-grade designer, motion artist, and 3D wizard.

## Stack

Static site, no build step:

- `index.html` — markup and content
- `styles.css` — glass UI styling
- `script.js` — skill grid, search, filters, theme toggle, i18n (EN / RU)

## Run locally

Open `index.html` directly in a browser, or serve the folder with any static server:

```sh
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.
