self.addEventListener('install', (event) => {
  console.log('Service worker installing...');
  // Add logic for caching resources here if needed
});

self.addEventListener('activate', (event) => {
  console.log('Service worker activated.');
});

self.addEventListener('fetch', (event) => {
  console.log('Fetching:', event.request.url);
  event.respondWith(fetch(event.request));
});
