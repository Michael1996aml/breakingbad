const APP_SHELL = [
    //"/",
    "home.html",
    "css/style.css",
    "img/logo.png",
    "js/init.js",
];
const APP_SHELL_INMUTABLE =[
    "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha3/dist/css/bootstrap.min.css",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha3/dist/js/bootstrap.bundle.min.js",
    "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js",
];
const CACHE_ESTATICO = "estaticov1";
const CACHE_INMUTABLE = "inmutablev1";




self.addEventListener('install',e=>{
    const cacheEstatico = caches.open(CACHE_ESTATICO).then(cache=>cache.addAll(APP_SHELL));
    const cacheInmutable = caches.open(CACHE_INMUTABLE).then(cache=>cache.addAll(APP_SHELL_INMUTABLE));
    e.waitUntil(Promise.all([cacheEstatico,cacheInmutable]));
});

self.addEventListener('activate',e=>{
    console.log("Service worker activado")
});

self.addEventListener('fetch',e=>{
   const respuesta = caches.match(e.request).then(res=>{
        if (res && !e.request.url.includes("/api")){
            return res;
        }
        else{
            const petInternet = fetch(e.request).then(newRes=>{
                if(newRes.ok | newRes.type == 'opaque'){
                    return caches.open("dinamicov1").then(cache=>{
                        cache.put(e.request, newRes.clone());
                        return newRes.clone();
                    });
                }else{
                    console.log(newRes);
                    return newRes;
                }
            }).catch(error=>caches.match(e.request));
            return petInternet;
        }
   }); 
   e.respondWith(respuesta);
});