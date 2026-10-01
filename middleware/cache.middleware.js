const cache = new Map();
const TTL = 60 * 1000; 

function cacheMiddleware(req, res, next) {
    if (req.method !== 'GET') {
        return next();
    }

    const key = req.originalUrl || req.url;
    const cachedEntry = cache.get(key);
    const now = Date.now();

    if (cachedEntry) {
        const isExpired = (now - cachedEntry.timestamp) > TTL;
        if (!isExpired) {
            res.setHeader('X-Cache', 'HIT');
            return res.json(cachedEntry.data);
        } else {
            cache.delete(key);
        }
    }

    res.setHeader('X-Cache', 'MISS');
    const originalJson = res.json.bind(res);
    res.json = (body) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            cache.set(key, {
                data: body,
                timestamp: Date.now()
            });
        }
        return originalJson(body);
    };

    next();
}

function clearCache() {
    cache.clear();
}

module.exports = {
    cacheMiddleware,
    clearCache
};
