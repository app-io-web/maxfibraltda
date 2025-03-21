self.addEventListener("install", (event) => {
    event.waitUntil(
      caches.open("maxfibra-cache").then((cache) => {
        return cache.addAll([
          "/",
          "/index.html",
          "/static/js/bundle.js",
          "/static/css/main.css",
          "/logo192.png",
          "/logo512.png",
        ]);
      })
    );
  });
  
  self.addEventListener("fetch", (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  