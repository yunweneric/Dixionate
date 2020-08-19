const staticCacheName = 'site-static';
const dynamicCacheName = 'site-dynamic-v3';
const assets = [
  '/',
  '/index.html',
  '/app.js',
  '/stylesheets/illustrations/logo.png',
  '/stylesheets/bootstrap-4/css/bootstrap.css',
  '/stylesheets/reset.css',
  '/stylesheets/main.css',
  'stylesheets/bootstrap-4/js/bootstrap.min.js',
  '/stylesheets/jquery/jquery.min.js',
  '/script.js',
  'https://fonts.googleapis.com/css2?family=Alegreya&family=B612&family=Lato&family=Muli:ital@1&display=swap',
  '/img/icons/icon-96x96.png',
  // '/dictionary.json',
  'https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wXiWtFCc.woff2'
];

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

// install event
self.addEventListener('install', evt => {
  //console.log('service worker installed');
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener('activate', evt => {
  //console.log('service worker activated');
  evt.waitUntil(
    caches.keys().then(keys => {
      //console.log(keys);
      return Promise.all(keys
        .filter(key => key !== staticCacheName && key !== dynamicCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

// fetch events
self.addEventListener('fetch', evt => {
  //   if (evt.request.url.indexOf('firestore.googleapis.com') === -1) {
  //     evt.respondWith(
  //       caches.match(evt.request).then(cacheRes => {
  //         return cacheRes || fetch(evt.request).then(fetchRes => {
  //           return caches.open(dynamicCacheName).then(cache => {
  //             cache.put(evt.request.url, fetchRes.clone());
  //             // check cached items size
  //             limitCacheSize(dynamicCacheName, 15);
  //             return fetchRes;
  //           })
  //         });
  //       })
  //         .catch(() => {
  //           if (evt.request.url.indexOf('.html') > -1) {
  //             return caches.match('/pages/fallback.html');
  //           }
  //         })
  //     );
  //   }
  // });
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request)
    })
  )
});
//