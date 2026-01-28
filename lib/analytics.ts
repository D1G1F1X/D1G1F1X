// Analytics utility for tracking user interactions and performance
export const trackEvent = (eventName: string, eventData?: Record<string, unknown>) => {
  if (typeof window === "undefined") return

  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics] ${eventName}`, eventData)
  }

  // Send to analytics service (example with Google Analytics)
  if ((window as any).gtag) {
    ;(window as any).gtag("event", eventName, eventData)
  }
}

export const trackPageView = (pageName: string, pagePath: string) => {
  trackEvent("page_view", {
    page_title: pageName,
    page_path: pagePath,
  })
}

export const trackConversion = (conversionType: string, value?: number) => {
  trackEvent("conversion", {
    conversion_type: conversionType,
    value: value,
  })
}

export const trackFormSubmission = (formName: string, fields?: string[]) => {
  trackEvent("form_submission", {
    form_name: formName,
    fields_completed: fields?.length || 0,
  })
}

// Performance metrics tracking
export const trackPerformanceMetrics = () => {
  if (typeof window === "undefined" || !("performance" in window)) return

  const perfData = performance.timing
  const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart
  const connectTime = perfData.responseEnd - perfData.requestStart
  const renderTime = perfData.domComplete - perfData.domLoading

  trackEvent("performance_metrics", {
    page_load_time: pageLoadTime,
    connect_time: connectTime,
    render_time: renderTime,
  })
}
