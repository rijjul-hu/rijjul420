// Service Worker for Ultra-Fast Caching v2
const CACHE_NAME = 'rijjul-portfolio-v2';
const STATIC_CACHE = 'static-v2';
const DYNAMIC_CACHE = 'dynamic-v2';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/profile.jpg',
  '/sw.js'
];

// Install - Cache all static assets immediately
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log('Caching static assets');
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate - Clean old caches immediately
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== STATIC_CACHE && key !== DYNAMIC_CACHE)
          .map((key) => {
            console.log('Deleting old cache:', key);
            return caches.delete(key);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch - Cache-first strategy for static, network-first for dynamic
self.addEventListener('fetch', (e) => {
  const url = e.request.url;
  
  // Static assets - cache first
  if (STATIC_ASSETS.some(asset => url.includes(asset))) {
    e.respondWith(
      caches.match(url).then((cached) => {
        if (cached) {
          console.log('Serving from cache:', url);
          return cached;
        }
        return fetch(e.request);
      })
    );
    return;
  }
  
  // External resources - network first with cache fallback
  if (url.includes('googleapis.com') || url.includes('gstatic.com')) {
    e.respondWith(
      caches.match(url).then((cached) => {
        const fetchPromise = fetch(e.request).then((networkResponse) => {
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(url, networkResponse.clone());
          });
          return networkResponse;
        }).catch(() => cached);
        
        return cached || fetchPromise;
      })
    );
    return;
  }
  
  // Everything else - network first
  e.respondWith(
    fetch(e.request).then((response) => {
      const responseClone = response.clone();
      caches.open(DYNAMIC_CACHE).then((cache) => {
        cache.put(url, responseClone);
      });
      return response;
    }).catch(() => caches.match(url))
  );
});
