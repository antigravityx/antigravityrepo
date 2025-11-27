const CACHE_NAME = 'verix-music-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './js/verix-player.js',
    './manifest.json'
];

// Install Event: Cache Core Assets ("Compressing the code")
self.addEventListener('install', (event) => {
    console.log('[VerixSW] Installing Service Worker...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[VerixSW] Caching app shell');
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

// Activate Event: Clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[VerixSW] Activating...');
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    console.log('[VerixSW] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
});

// Fetch Event: Network First, then Cache (Hybrid Strategy)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request)
            .catch(() => {
                return caches.match(event.request);
            })
    );
});
