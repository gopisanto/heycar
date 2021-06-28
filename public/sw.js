const CACHE_NAME = 'sw_cache_v1';

const urlsToCache = ['offline.html'];

const self = this;

//install SW
self.addEventListener('install', (event) => {
event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => {
        return cache.addAll(urlsToCache);
    })
);
self.skipWaiting();
})

//Listen for requests
self.addEventListener('fetch', (event) => {
event.respondWith(
    caches.match(event.request).then((resp) => {
        return resp || fetch(event.request).then((response) => {
          let responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          })
  
          return response;
        }).catch(function() {
            const channel4Broadcast = new BroadcastChannel('channel4');
            channel4Broadcast.postMessage({offline: true});
            return caches.match('/offline.html');
        })
      })
)});

// Activate SW
self.addEventListener('activate', (event) => {
const cacheWhitelist = [];
cacheWhitelist.push(CACHE_NAME);

event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
        cacheNames.map(cacheName => {
            if (!cacheWhitelist.includes(cacheName)) {
                return caches.delete(cacheName);
            }
        })
    ))
);
})
