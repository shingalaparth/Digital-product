export type AnalyticsEventName =
  | "primary_cta_click"
  | "comparison_cta_click"
  | "pricing_toggle_change"
  | "faq_expand"
  | "waitlist_submit";

export type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: AnalyticsEventName, payload: AnalyticsPayload = {}): void {
  if (typeof window === "undefined") {
    return;
  }

  const cleanPayload = Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined),
  );

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...cleanPayload });

  if (typeof window.gtag === "function") {
    window.gtag("event", event, cleanPayload);
  }
}

