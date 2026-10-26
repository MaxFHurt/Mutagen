// MUTAGEN: offline support for Deck Mutator, so an installed MUTAGEN can open it without a connection. Same approach as
// the game side (../commander/sw.js): every request for this site's files goes to the network with revalidation, and
// the cache is used only when the device is offline. Card data and images from other sites go straight to the network.
const CACHE = 'mutagen-deck-v1';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('mutagen-deck-') && key !== CACHE).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    try {
      const fresh = await fetch(request, { cache: 'no-cache' });
      if (fresh.ok) cache.put(request, fresh.clone());
      return fresh;
    } catch (error) {
      const cached = await cache.match(request, { ignoreSearch: true });
      if (cached) return cached;
      throw error;
    }
  })());
});
