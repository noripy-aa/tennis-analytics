const CACHE_NAME = 'tennis-analytics-v13';
const ASSETS = [
  './index.html',
  './manifest.json'
];

// インストール時に必要最低限のファイルをキャッシュ
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// アプリ起動時はキャッシュがあればそれを返し、なければネットから取得
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});