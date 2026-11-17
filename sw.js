const CACHE_NAME='training-log-v3';
const APP_FILES=['./','./index.html','./manifest.webmanifest'];
self.addEventListener('install',event=>{event.waitUntil((async()=>{const cache=await caches.open(CACHE_NAME);try{await cache.addAll(APP_FILES)}catch(e){};await self.skipWaiting()})())});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k.startsWith('training-log-')&&k!==CACHE_NAME).map(k=>caches.delete(k)));await self.clients.claim()})())});
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;const url=new URL(event.request.url);if(url.origin!==self.location.origin)return;event.respondWith((async()=>{try{const response=await fetch(event.request);if(response.ok){const cache=await caches.open(CACHE_NAME);cache.put(event.request,response.clone())}return response}catch(error){const cached=await caches.match(event.request);return cached||Response.error()}})())});
