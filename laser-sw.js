console.log('Hello from sw.js');

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.precaching.precache([
  { url: '/laser/index.html', revision: '3' },
  { url: '/laser/manifest.json', revision: '3' },
  '/laser/images/light_192.png',
  '/laser/images/light_512.png',
  'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css',
  'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js',
  'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js',
  'https://ajax.googleapis.com/ajax/libs/threejs/r84/three.min.js'
]);

const bg_sync_plugin = new workbox.backgroundSync.Plugin('myQueueName', {
  maxRetentionTime: 24 * 60 // Retry for max of 24 Hours
});

// serve manifest & .html files. serve cache first, then update cache in background
workbox.routing.registerRoute(
  new RegExp('.*\.html'),
  workbox.strategies.staleWhileRevalidate()
);
workbox.routing.registerRoute(
  new RegExp('.*/manifest.json'),
  workbox.strategies.staleWhileRevalidate()
);

// serve images, .css & .js cache first
workbox.routing.registerRoute(
  new RegExp('/images/'),
  workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
  new RegExp('.*\.css'),
  workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
  new RegExp('.*\.js'),
  workbox.strategies.staleWhileRevalidate()
);

