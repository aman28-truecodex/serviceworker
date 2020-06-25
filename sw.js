if('serviceWorker' in navigator){
    window.addEventListener('load',()=>{
        navigator.serviceWorker.register('./cacheSite.js').then((Reg)=>{
        console.log('service Worker:Register')
        }).catch((err)=>{
            console.log(`ServiceWorker Error:${err}`);
        })
    })
}