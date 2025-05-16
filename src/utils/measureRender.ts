let startTime = 0;

export function markRenderStart() {
    startTime = performance.now();
}

export function markRenderEnd(pageName: string) {
    const endTime = performance.now();
    const duration = endTime - startTime;
    console.log(`[Render] ${pageName} rendered in ${duration.toFixed(2)} ms`);
    // Тут можна зберегти у memoryCache або на бекенд
}
