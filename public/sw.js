const CACHE_NAME = 'sw_cache_v2';

const self = this;

//install SW
self.addEventListener('install', (event) => {
    console.log('SW installed');
})

//Listen for requests
self.addEventListener('fetch', (event) => {
event.respondWith(
    fetch(event.request)
    .then(resp => {
        const respClone = resp.clone();

        caches.open(CACHE_NAME)
        .then(cache => {
            console.log('Cached request and response'+JSON.stringify(event.request.url));
            cache.put(event.request, respClone);
        })

        return resp;
    }).catch(() => caches.match(event.request).then(res => res))
);
})

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
