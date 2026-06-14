// Service worker — фоновый помощник: кэширует файлы сайта,
// чтобы «Просто дыши» открывалось даже без интернета.

// Версия кэша. Если поменяем файлы — увеличиваем число, и кэш обновится.
const CACHE = "prosto-dyshi-v6";

// Что сохраняем для работы оффлайн.
const FILES = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png",
];

// Установка: складываем файлы в кэш.
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(FILES)));
  self.skipWaiting();
});

// Активация: удаляем старые версии кэша.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Запрос файла: сначала смотрим в кэше, если нет — идём в сеть.
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
