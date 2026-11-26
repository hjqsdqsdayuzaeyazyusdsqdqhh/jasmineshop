/**
 * Small browser cookie helper.
 * Kept outside React components so state logic stays pure and lint-safe.
 */
export function setCookie(
  name: string,
  value: string,
  maxAgeSeconds = 60 * 60 * 24 * 365,
) {
  if (typeof document === "undefined") return;
  const secure =
    typeof location !== "undefined" && location.protocol === "https:"
      ? "; secure"
      : "";
  document.cookie = `${name}=${value}; path=/; max-age=${maxAgeSeconds}; samesite=lax${secure}`;
}
