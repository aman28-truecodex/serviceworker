const cacheName='v1';
const cacheAssets=[
    'index.html',
    'sw.js'
]
// install service worker
self.addEventListener('install',(e)=>{
console.log('serviceWorker: Installed');
e.waitUntil(
    caches.open(cacheName).then((cache)=>{
        console.log('Service Worker:caching File');
        cache.addAll(cacheAssets);
    }).then(()=>{
        self.skipWaiting();
    })
)
});

//activate
self.addEventListener('activate',(e)=>{
    console.log('serviceWorker: Activated');
    //remove unwanted caches
    e.waitUntil(
        caches.keys().then((cacheNames)=>{
         return Promise.all(
             cacheNames.map((cache)=>{
            if(cache!==cacheName){
                console.log('service Worker is Deleting Old Cache');
                return caches.delete(cache);
            }
             })
         )
        })
    )
    });

    self.addEventListener('fetch',(e)=>{
console.log('service Working: Fetching');
e.respondWith(fetch(e.request).catch(()=>{caches.match(e.request)}));
    });