# Ledger 89

Finance calculator with a TI-89-style history screen and a loan amortization worksheet. Installs on a phone as an app and works offline.

## Put it online (GitHub Pages, free)

1. On github.com, create a new **public** repository named `ledger-89`.
2. On the empty repo page, choose **uploading an existing file**. Drag in everything from this folder: `index.html`, `manifest.webmanifest`, `sw.js`, `README.md` and the `icons` folder. Commit.
3. Go to **Settings → Pages**. Under Build and deployment, set Source to **Deploy from a branch**, Branch to **main** and folder **/ (root)**. Save.
4. After a minute or two the page shows the site address, which looks like `https://YOUR-USERNAME.github.io/ledger-89/`.

## Install it on the phone

1. Open that address in Chrome on the phone.
2. Tap the **⋮** menu, then **Install app** (some versions say **Add to Home screen**, then **Install**).
3. Launch it once from the new icon while online so it can save itself for offline use.

## Install it on a computer

Open the same address in Chrome or Edge and click the install icon at the right end of the address bar (or the browser menu, then **Install Ledger 89**). It opens in its own window and works offline. On a wide window, Home shows the keypad, stored values and keyboard help beside the history.

## Updating

Replace `index.html` in the repo with a new version. The app picks it up the next time it opens with a connection. If `manifest.webmanifest`, the icons or `sw.js` change, change `VERSION` at the top of `sw.js` in the same update. The installed app keeps its saved copies of those files until `sw.js` changes.

History, stored values and loan inputs live only on the device where you use the app.
