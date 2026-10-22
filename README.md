# 24-7 Worship

A static website for **24-7 Worship**, a vision for a Christian worship and prayer center in Vancouver, British Columbia. The page is plain HTML, CSS, and JavaScript. There is no build step and no server. `index.html` at the repository root is what GitHub Pages publishes.

The center worships the one true living God — the Father, Jesus the Son, and the Holy Spirit — and is hoped for as a place of healing. Churches and worship teams would keep hour-long slots, beginning with weekend overnights and growing toward continuous worship. No venue, phone number, partner, or date is claimed on the page.

## Preview on your computer

From this folder:

```bash
python3 -m http.server 8080
```

Open [http://localhost:8080](http://localhost:8080).

Opening `index.html` directly from the file system also works. A local server is the closer match to GitHub Pages.

## Publish with GitHub Pages

1. Push this project to a GitHub repository. Keep `index.html` at the root of the branch you publish.
2. On GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Choose the branch that contains this site (usually `main`) and the folder **`/ (root)`**.
5. Save.

GitHub will show the published URL after the first deploy finishes. That is often a minute or two.

- A repository named `username.github.io` is published at `https://username.github.io/`.
- Any other repository is a project site at `https://username.github.io/<repository>/`.

Free GitHub Pages for a personal account publishes a public repository. Private-repository Pages depends on the GitHub plan.

The empty file `.nojekyll` tells GitHub Pages to copy the files as they are and skip Jekyll. Styles, the script, and the icon use relative paths (`css/styles.css`, not `/css/styles.css`), so the same files work for a user site and a project site.

If the Pages screen offers GitHub Actions as the only suggested source, switch the source to **Deploy from a branch**. This site has nothing to compile.

## Before you share the site

`247worshipnhealing@gmail.com` is a **placeholder**. The domain `example.com` is reserved, and mail sent there is not delivered. The Get involved and Prayer forms only open the visitor’s own email app. They do not store a message, and they do not accept donations or payments.

Search the project for `247worshipnhealing@gmail.com` and replace every occurrence with an inbox you control:

- `index.html` — the `data-contact-email` attribute on `<html>`, which the forms use
- `index.html` — the visible `mailto:` links in Get involved, Prayer requests, and Contact

Leave the word **Placeholder** visible until that address is real, then remove those badges and the sentences that say the inbox is not working yet.

These details are intentionally unset. Do not invent them:

- Street address and a rented venue (Plaza of Nations and False Creek appear only as the founder’s hope)
- Phone number
- Partner churches or worship teams
- Gathering dates

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The page: Home, Vision, How it works, Get involved, Prayer requests, Contact |
| `css/styles.css` | Layout, type, and color |
| `js/main.js` | Mobile menu, current section, and `mailto:` links |
| `assets/favicon.svg` | Icon |
| `site.webmanifest` | Name and theme color |
| `.nojekyll` | Disables Jekyll on GitHub Pages |

## Scripture

Quotations are from the King James Version, which is in the public domain.
