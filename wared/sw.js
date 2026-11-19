// وارد: تخزين مؤقت بسيط ليعمل التطبيق دون اتصال بعد أول فتح
const C='wared-v1';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./'])).catch(()=>{}))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
 e.respondWith(caches.open(C).then(async c=>{const m=await c.match(e.request,{ignoreSearch:true});
  const n=fetch(e.request).then(r=>{if(r&&r.ok&&(r.type==='basic'||r.type==='cors'))c.put(e.request,r.clone());return r}).catch(()=>m);
  return m||n}))});
