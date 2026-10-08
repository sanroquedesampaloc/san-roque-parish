import { SITE_URL } from "@/lib/constants";
import type { PARISH_SETTINGS_QUERY_RESULT } from "../../../sanity.types";

/**
 * Extracts lat/lng from a standard Google Maps "place" URL of the form
 * `.../@14.6074602,120.9957041,17z/...`. Returns null if the URL doesn't
 * contain that pattern — we never guess or fall back to approximate
 * coordinates, since an invented location is worse than no location.
 */
function extractGeoFromMapsUrl(
  url: string | null | undefined
): { lat: number; lng: number } | null {
  if (!url) return null;
  const match = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (!match) return null;
  return { lat: Number(match[1]), lng: Number(match[2]) };
}

export function ChurchStructuredData({
  settings,
}: {
  settings: PARISH_SETTINGS_QUERY_RESULT | null;
}) {
  if (!settings?.parishName) return null;

  const geo = extractGeoFromMapsUrl(settings.googleMapsUrl);
  const sameAs = [settings.facebookUrl, settings.youtubeUrl].filter(
    (url): url is string => Boolean(url)
  );

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Church",
    name: settings.parishName,
    url: SITE_URL,
  };

  if (settings.shortDescription) jsonLd.description = settings.shortDescription;
  if (settings.address) {
    jsonLd.address = {
      "@type": "PostalAddress",
      streetAddress: settings.address,
      addressLocality: "Manila",
      addressCountry: "PH",
    };
  }
  if (settings.phone) jsonLd.telephone = settings.phone;
  if (settings.email) jsonLd.email = settings.email;
  if (geo) {
    jsonLd.geo = {
      "@type": "GeoCoordinates",
      latitude: geo.lat,
      longitude: geo.lng,
    };
  }
  if (sameAs.length > 0) jsonLd.sameAs = sameAs;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
