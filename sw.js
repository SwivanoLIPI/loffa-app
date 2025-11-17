const CACHE_NAME = 'loffa-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/all.css',
  '/assets/chart.js',
  '/assets/mediapipe/drawing_utils.js',
  '/assets/mediapipe/face_mesh/face_mesh.js',
  '/assets/mediapipe/face_mesh/face_mesh.binarypb',
  '/assets/mediapipe/face_mesh/face_mesh_solution_packed_assets.data',
  '/assets/mediapipe/face_mesh/face_mesh_solution_packed_assets_loader.js',
  '/assets/mediapipe/face_mesh/face_mesh_solution_simd_wasm_bin.data',
  '/assets/mediapipe/face_mesh/face_mesh_solution_simd_wasm_bin.js',
  '/assets/mediapipe/face_mesh/face_mesh_solution_simd_wasm_bin.wasm',
  '/assets/mediapipe/face_mesh/face_mesh_solution_wasm_bin.js',
  '/assets/mediapipe/face_mesh/face_mesh_solution_wasm_bin.wasm',
  '/webfonts/fa-brands-400.ttf',
  '/webfonts/fa-brands-400.woff2',
  '/webfonts/fa-regular-400.ttf',
  '/webfonts/fa-regular-400.woff2',
  '/webfonts/fa-solid-900.ttf',
  '/webfonts/fa-solid-900.woff2'
  // Tambah jika ada file lain
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});