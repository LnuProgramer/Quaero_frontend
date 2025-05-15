const memoryCache = new Map<string, any>();

export const setCache = (key: string, value: any) => {
    memoryCache.set(key, value);
};

export const getCache = (key: string) => {
    return memoryCache.get(key);
};

export const clearCache = (key: string) => {
    memoryCache.delete(key);
};
