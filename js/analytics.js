// 简单的性能监控
const performanceMonitor = {
  init() {
    this.collectNavigationTiming();
    this.collectResourceTiming();
    this.trackUserInteraction();
  },

  collectNavigationTiming() {
    window.addEventListener("load", () => {
      const timing = performance.getEntriesByType("navigation")[0];
      const metrics = {
        dnsLookup: timing.domainLookupEnd - timing.domainLookupStart,
        tcpConnection: timing.connectEnd - timing.connectStart,
        serverResponse: timing.responseEnd - timing.requestStart,
        domLoad: timing.domContentLoadedEventEnd - timing.responseEnd,
        fullPageLoad: timing.loadEventEnd - timing.navigationStart,
      };
      console.log("Performance Metrics:", metrics);
    });
  },

  collectResourceTiming() {
    const resources = performance.getEntriesByType("resource");
    const resourceMetrics = resources.map((resource) => ({
      name: resource.name,
      duration: resource.duration,
      size: resource.transferSize,
    }));
    console.log("Resource Metrics:", resourceMetrics);
  },

  trackUserInteraction() {
    let lastInteraction = Date.now();
    document.addEventListener("click", () => {
      lastInteraction = Date.now();
    });
    document.addEventListener("scroll", () => {
      lastInteraction = Date.now();
    });
  },
};

// 初始化性能监控
performanceMonitor.init();
