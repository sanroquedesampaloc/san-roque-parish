import { getFacebookEmbedUrl } from "@/lib/facebookEmbed";

/**
 * Renders a responsive Facebook video-plugin iframe for a given public
 * Facebook video/Live URL. Returns null (renders nothing) if the URL isn't
 * a recognized Facebook link — callers should show their own offline/
 * fallback state in that case rather than relying on this to do it.
 */
export function FacebookLiveEmbed({
  url,
  title,
}: {
  url: string | null | undefined;
  title: string;
}) {
  const embedUrl = getFacebookEmbedUrl(url);
  if (!embedUrl) return null;

  return (
    <div className="relative w-full aspect-video bg-charcoal/5 overflow-hidden">
      <iframe
        src={embedUrl}
        title={title}
        className="absolute inset-0 w-full h-full border-0"
        allow="fullscreen; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}
