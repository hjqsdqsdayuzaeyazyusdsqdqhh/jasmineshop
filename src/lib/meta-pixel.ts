declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Sends an event to the Meta Pixel loaded once in the root layout.
 * Safe to call on the server and when the pixel is blocked by the browser.
 */
export function trackMeta(
  event: string,
  params?: Record<string, unknown>,
) {
  if (typeof window === "undefined") return;
  window.fbq?.("track", event, params);
}
