// service-worker.js

// 缓存名称
const CACHE_NAME = 'my-cache-v1';
const OFFLINE_URL = '/offline.html';

// 预缓存资源
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([
                OFFLINE_URL,
                // 在这里添加其他你希望缓存的文件
            ]);
        })
    );
});

// 从缓存中提供资源
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request).then((response) => {
                return response || caches.match(OFFLINE_URL);
            });
        })
    );
});

// 处理后台同步
self.addEventListener('sync', (event) => {
    if (event.tag === 'syncData') {
        event.waitUntil(
            fetch('/sync', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: 'Your data here' }),
            })
            .then(response => response.json())
            .then(data => console.log('Sync complete:', data))
            .catch(error => console.error('Sync failed:', error))
        );
    }
});

// 推送通知（可选）
self.addEventListener('push', (event) => {
    const options = {
        body: event.data.text(),
        icon: 'icon.png',
        badge: 'badge.png',
    };
    event.waitUntil(
        self.registration.showNotification('Notification Title', options)
    );
});
