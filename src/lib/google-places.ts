import "server-only";

const PLACES_API_BASE = "https://places.googleapis.com/v1/places";

interface AuthorAttribution {
  displayName: string;
  uri: string;
  photoUri: string;
}

export interface GoogleReview {
  authorAttribution: AuthorAttribution;
  rating: number;
  text: { text: string; languageCode: string } | null;
  relativePublishTimeDescription: string;
  googleMapsUri: string;
}

export interface PlaceDetails {
  displayName: { text: string; languageCode: string };
  rating: number;
  userRatingCount: number;
  reviews: GoogleReview[];
  googleMapsUri: string;
}

const FIELD_MASK = [
  "displayName",
  "rating",
  "userRatingCount",
  "reviews",
  "googleMapsUri",
].join(",");

export async function getPlaceDetails(): Promise<PlaceDetails | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) return null;

  try {
    const res = await fetch(`${PLACES_API_BASE}/${placeId}`, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": FIELD_MASK,
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;

    const data = (await res.json()) as PlaceDetails;

    if (!data.rating || !data.reviews?.length) return null;

    return data;
  } catch {
    return null;
  }
}
