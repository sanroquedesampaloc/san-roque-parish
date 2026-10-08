// Facebook video permalinks and Live videos are shared from a small, known
// set of hosts. Matching the hostname exactly (not with a substring/suffix
// check) blocks lookalike domains like "facebook.com.evil.example".
const ALLOWED_FACEBOOK_HOSTS = new Set([
  "facebook.com",
  "www.facebook.com",
  "m.facebook.com",
  "web.facebook.com",
  "fb.watch",
]);

const FACEBOOK_VIDEO_PLUGIN_URL = "https://www.facebook.com/plugins/video.php";

/**
 * Builds a safe Facebook video-plugin embed URL from a parish-provided
 * Facebook video/Live permalink, or returns null if the URL isn't a
 * recognized, well-formed Facebook link. Never trust this output as HTML —
 * it's a URL meant for an <iframe src>, not markup.
 */
export function getFacebookEmbedUrl(rawUrl: string | null | undefined): string | null {
  if (!rawUrl) return null;

  let parsed: URL;
  try {
    parsed = new URL(rawUrl);
  } catch {
    return null;
  }

  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return null;
  if (!ALLOWED_FACEBOOK_HOSTS.has(parsed.hostname)) return null;

  const embed = new URL(FACEBOOK_VIDEO_PLUGIN_URL);
  embed.searchParams.set("href", parsed.toString());
  embed.searchParams.set("show_text", "false");
  embed.searchParams.set("autoplay", "false");
  return embed.toString();
}
