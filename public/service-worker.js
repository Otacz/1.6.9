self.addEventListener('install', event => {
  console.log('Service Worker installing.');
  return null;
});

self.addEventListener('activate', event => {
  console.log('Service Worker activating.');
  return null;
});
