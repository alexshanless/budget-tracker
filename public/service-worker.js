console.log("S W runin");

const cacheName = "v3";

const filesCache = ["/", "/index.html", "/styles.css", "/index.js"];

//Code to install and register
self.addEventListener("install", (e) => {
  console.log("S W installed");

  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log("Service Worker: caching files");
      return cache.addAll(filesCache);
    })
  );
  self.skipWaiting();
});

//Activating
self.addEventListener("activate", (e) => {
  console.log("activated");
  //Remove unwanted caches
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log("clearing old cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

//Call Fetch
self.addEventListener("fetch", (e) => {
  console.log("service worker: fetching");
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
