const CACHE_NAME = 'loffa-cache-v4';

// prefix folder GitHub Pages
const BASE = '/loffa-app';

const urlsToCache = [
  `${BASE}/`,
  `${BASE}/index.html`,
  `${BASE}/all.css`,
  `${BASE}/assets/chart.js`,
  `${BASE}/assets/mediapipe/drawing_utils.js`,
  `${BASE}/assets/mediapipe/face_mesh/face_mesh.js`,
  `${BASE}/assets/mediapipe/face_mesh/face_mesh.binarypb`,
  `${BASE}/assets/mediapipe/face_mesh/face_mesh_solution_packed_assets.data`,
  `${BASE}/assets/mediapipe/face_mesh/face_mesh_solution_packed_assets_loader.js`,
  `${BASE}/assets/mediapipe/face_mesh/face_mesh_solution_simd_wasm_bin.data`,
  `${BASE}/assets/mediapipe/face_mesh/face_mesh_solution_simd_wasm_bin.js`,
  `${BASE}/assets/mediapipe/face_mesh/face_mesh_solution_simd_wasm_bin.wasm`,
  `${BASE}/assets/mediapipe/face_mesh/face_mesh_solution_wasm_bin.js`,
  `${BASE}/assets/mediapipe/face_mesh/face_mesh_solution_wasm_bin.wasm`,
  `${BASE}/webfonts/fa-brands-400.ttf`,
  `${BASE}/webfonts/fa-brands-400.woff2`,
  `${BASE}/webfonts/fa-regular-400.ttf`,
  `${BASE}/webfonts/fa-regular-400.woff2`,
  `${BASE}/webfonts/fa-solid-900.ttf`,
  `${BASE}/webfonts/fa-solid-900.woff2`
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  if (event.request.url.includes(BASE)) {
    event.respondWith(
      caches.match(event.request).then(response => response || fetch(event.request))
    );
  }
});



