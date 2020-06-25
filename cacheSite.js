const cacheName='v2';

// install service worker
self.addEventListener('install',(e)=>{
console.log('serviceWorker: Installed');

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
e.respondWith(
fetch(e.request).then((res)=>{
    //make clone of response
    let resClone=res.clone();
    //open cache
    caches.open(cacheName).then((cache)=>{
   cache.put(e.request, resClone)
    })
    return res;
}).catch((err)=>{
caches.match(e.request).then((res)=>{res})
})


);
    });















