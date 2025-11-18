// sw.js — Versi FINAL untuk GitHub Pages + Full Offline (November 2025)

// 1. Ganti importScripts jadi self.importScripts (lebih aman di beberapa browser)
if ('function' === typeof importScripts) {
  importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.6.0/workbox-sw.js');
}

// 2. Tambahkan ini di paling atas — WAJIB agar Workbox jalan kalau CDN gagal (fallback offline)
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());

workbox.routing.registerRoute(
  ({request}) => request.destination === 'script' ||
                  request.destination === 'style' ||
                  request.destination === 'image' ||
                  request.mode === 'navigate',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'loffa-static',
  })
);

// Cache MediaPipe Face Mesh + WASM (karena kamu pakai Face Mesh, bukan Landmarker)
workbox.routing.registerRoute(
  ({url}) => url.pathname.includes('face_mesh') || 
             url.pathname.includes('.wasm') ||
             url.pathname.includes('drawing_utils.js'),
  new workbox.strategies.CacheFirst({
    cacheName: 'mediapipe-assets',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 30,
        maxAgeSeconds: 60 * 24 * 60 * 60, // 60 hari
      }),
    ],
  })
);

// Cache Font Awesome webfonts
workbox.routing.registerRoute(
  ({url}) => url.pathname.includes('webfonts/'),
  new workbox.strategies.CacheFirst({
    cacheName: 'fa-fonts',
  })
);

// Precache file utama (tambahkan semua file penting)
workbox.precaching.precacheAndRoute([
  { url: '/', revision: null },
  { url: '/index.html', revision: null },
  { url: '/all.css', revision: null },
  { url: '/manifest.json', revision: null },
  { url: '/assets/chart.js', revision: null },
  { url: '/assets/mediapipe/face_mesh/face_mesh.js', revision: null },
  { url: '/assets/mediapipe/drawing_utils.js', revision: null },
  // Tambahkan file lain kalau perlu
]);