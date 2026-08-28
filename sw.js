const VERSION = "dropicgram-v3";
const CORE = [
  ".",
  "styles.css",
  "app.js",
  "icon-192.png",
  "icon-512.png",
  "manifest.json",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(VERSION).then((c) => c.addAll(CORE)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (url.pathname.startsWith("/api") || url.pathname.startsWith("/uploads")) return;

  if (e.request.method !== "GET") return;

  const isHtml =
    e.request.mode === "navigate" ||
    e.request.headers.get("accept")?.includes("text/html") ||
    url.pathname.endsWith(".html");

  // HTML is always network-first so new pages reach PWA users immediately
  if (isHtml) {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
    return;
  }

  // assets: network-first too, so app.js updates don't linger in cache
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(VERSION).then((c) => c.put(e.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
