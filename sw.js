// Ledger 89 offline cache.
// The page itself is fetched network-first (giving up after 2 seconds) so updates arrive on the next
// online launch; everything else is served from the cache. Bump VERSION whenever the manifest, the icons or this
// file change: the app keeps serving its cached copies until this file changes.
const VERSION = 'ledger89-v4';
const SHELL = [
  './',
  'index.html',
  'manifest.webmanifest',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'icons/apple-touch-icon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (url.origin !== self.location.origin) return;

  // The app page: try the network briefly so a new version shows up, fall back to the cached copy.
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      const cache = await caches.open(VERSION);
      try {
        const ctl = new AbortController();
        const timer = setTimeout(() => ctl.abort(), 2000);
        const res = await fetch(req, { signal: ctl.signal });
        clearTimeout(timer);
        if (res.ok) await cache.put('index.html', res.clone());
        return res;
      } catch (e) {
        return (await cache.match('index.html')) || (await cache.match('./')) || Response.error();
      }
    })());
    return;
  }

  event.respondWith(
    caches.match(req).then((hit) => hit || fetch(req).then((res) => {
      if (res.ok) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); }
      return res;
    }))
  );
});
