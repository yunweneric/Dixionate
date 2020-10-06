const staticCacheName = 'site-static-v2';
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
  '/dictionary.json',
  'https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wXiWtFCc.woff2'
];

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
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

// fetch event
self.addEventListener('fetch', evt => {
  console.log('fetch event', evt);
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});