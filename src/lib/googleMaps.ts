export function isGoogleMapsEmbedUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.origin === "https://www.google.com" && parsed.pathname.startsWith("/maps/embed");
  } catch {
    return false;
  }
}
