self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open('avata-v39').then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './manifest.json',
        './icon-192.png',
        './icon-512.png'
      ]);
    })
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(self.clients.claim());

  // Clean up old caches
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k.startsWith('avata-') && k !== 'avata-v39').map(k => caches.delete(k))
    ))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
