# CLAUDE.md

## 1. Projektüberblick

`lifehub` ist eine Toolsuite. Das erste Projekt darin ist die About-me-Seite
(berufliche Visitenkarte). Sie liegt direkt im Repo-Root.

## 2. Technik-Regeln

- Nur HTML, CSS und Vanilla-JavaScript. Kein Framework, kein Build, kein `package.json`, keine Abhängigkeiten.
- Keine externen Ressourcen: keine Fonts, CDNs, Analytics, Embeds. Einzige externe URLs sind die `href`s zu LinkedIn und GitHub.
- Keine Cookies, kein `localStorage`, `sessionStorage` oder `IndexedDB`.
- Schrift: System-Font-Stack. Icons: Inline-SVG.
- Barrierefreiheit: WCAG 2.2 AA (Kontrast ≥ 4,5:1 für Text, sichtbarer Fokus, sinnvolle Alt-Texte, korrektes `lang`).
- Responsiv ab 320 px Breite, ohne horizontales Scrollen.

## 3. Dateistruktur

- `index.html`
- `styles.css`
- `script.js`
- `favicon.svg`
- `robots.txt`
- `assets/profile.jpg` (nicht im Repo, kommt beim Deployment; per `.gitignore` ausgeschlossen)

## 4. Prüfungen

Müssen vor jedem PR laufen. Im Implement-Workflow sind nur diese Werkzeuge
freigegeben: **Grep-Tool** (ripgrep), `npx`, `python3`. `grep`, `du`, `wc` in
Bash sind dort nicht freigegeben. Fehlende Dateien werden übersprungen.

1. **Validator** (html-validate 11.16.3, gepinnt am 2026-10-17):
   `npx --yes html-validate@11.16.3 index.html` → keine Fehler.
2. **Externe Ressourcen**: Grep-Tool in `index.html`, `styles.css`, `script.js` mit dem Muster
   `(src|srcset)\s*=\s*["']?https?://|url\(\s*["']?https?://|@import|fetch\(\s*["'`]https?://|<link[^>]+href\s*=\s*["']?https?://`
   → keine Treffer.
3. **Erlaubte Links**: Grep-Tool in `index.html` mit dem Muster
   `href\s*=\s*["']https?://`
   → nur Treffer für `https://www.linkedin.com/in/kronbergerpeter` und `https://github.com/peterkronberger`.
4. **Speicher-APIs**: Grep-Tool in `*.html` und `*.js` mit dem Muster
   `localStorage|sessionStorage|indexedDB|document\.cookie`
   → keine Treffer.
5. **Gewicht**:
   `python3 -c "import os; print(sum(os.path.getsize(f) for f in ['index.html','styles.css','script.js','favicon.svg'] if os.path.exists(f)))"`
   → ≤ 153600 (150 KB; das Foto darf weitere ≤ 150 KB haben, Gesamtbudget 300 KB).
6. **robots.txt**:
   `python3 -c "b=open('robots.txt','rb').read(); assert b.isascii() and b'\r' not in b and b.endswith(b'\n'); print('OK')"`
   → `OK`.

Hinweise:

- Für Menschen lokal: Die Muster aus 2–4 funktionieren identisch mit `rg -n '<Muster>' <Dateien>`.
- Kontrastwerte für hellen und dunklen Modus im PR-Text angeben (Farbpaar + Verhältnis).

## 5. Deploy-Liste (manuelles Deployment)

**Nur** diese Dateien auf den Server:

- `index.html`
- `styles.css`
- `script.js`
- `favicon.svg`
- `robots.txt`
- `assets/` (inkl. `profile.jpg`)

**Niemals** deployen:

- `.git/`
- `.github/`
- `README.md`
- `CLAUDE.md`
- `.gitignore`
- `.html-validate.json`

## 6. Platzhalter

Der Über-mich-Text ist Blindtext und mit
`<!-- TODO: Platzhaltertext – vor Deployment ersetzen -->` markiert. Nicht
entfernen, solange kein echter Text vorliegt.
