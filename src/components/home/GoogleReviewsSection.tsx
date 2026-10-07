import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { PlaceDetails, GoogleReview } from "@/lib/google-places";

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = rating >= i + 1;
    const half = !filled && rating >= i + 0.5;
    return { filled, half, key: i };
  });

  const sizeClass = size === "lg" ? "w-5 h-5" : "w-4 h-4";

  return (
    <div className="inline-flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {stars.map(({ filled, half, key }) => (
        <svg
          key={key}
          className={`${sizeClass} ${filled || half ? "text-gold" : "text-border"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          {half ? (
            <>
              <defs>
                <clipPath id={`half-${key}`}>
                  <rect x="0" y="0" width="10" height="20" />
                </clipPath>
              </defs>
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                className="text-border"
              />
              <path
                clipPath={`url(#half-${key})`}
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                className="text-gold"
              />
            </>
          ) : (
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          )}
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: GoogleReview }) {
  const reviewText = review.text?.text;

  return (
    <article className="bg-white border border-border p-6 flex flex-col card-premium">
      <div className="flex items-center gap-2 mb-3">
        <StarRating rating={review.rating} />
      </div>

      {reviewText && (
        <blockquote className="text-sm text-charcoal-light leading-relaxed flex-1 mb-4 line-clamp-5">
          {reviewText}
        </blockquote>
      )}

      <footer className="mt-auto pt-3 border-t border-border-light">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-sm font-medium text-charcoal">
              {review.authorAttribution.displayName}
            </p>
            <p className="text-xs text-charcoal-muted mt-0.5">
              {review.relativePublishTimeDescription}
            </p>
          </div>
          {review.googleMapsUri && (
            <a
              href={review.googleMapsUri}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-charcoal-muted hover:text-burgundy transition-colors flex-shrink-0"
              aria-label={`View review by ${review.authorAttribution.displayName} on Google Maps`}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" stroke="currentColor" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          )}
        </div>
      </footer>
    </article>
  );
}

function GoogleAttribution() {
  return (
    <div className="flex items-center gap-2 text-xs text-charcoal-muted">
      <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
      </svg>
      <span>Reviews from Google Maps</span>
    </div>
  );
}

export function GoogleReviewsSection({ place }: { place: PlaceDetails | null }) {
  if (!place) return null;

  const reviews = place.reviews.slice(0, 5);
  if (reviews.length === 0) return null;

  return (
    <Section bg="warm">
      <Container>
        <SectionHeading
          eyebrow="Community Voices"
          title="What Parishioners Say"
        />

        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <div className="flex items-center gap-3">
              <span className="text-4xl font-semibold text-charcoal">{place.rating}</span>
              <div>
                <StarRating rating={place.rating} size="lg" />
                <p className="text-xs text-charcoal-muted mt-1">
                  {place.userRatingCount.toLocaleString()} reviews on Google
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((review, i) => (
              <ReviewCard key={i} review={review} />
            ))}
          </div>

          {reviews.length > 3 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-w-[calc(66.666667%+0.75rem)] mx-auto">
              {reviews.slice(3).map((review, i) => (
                <ReviewCard key={i + 3} review={review} />
              ))}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 pt-6 border-t border-border-light">
            <GoogleAttribution />
            <ButtonLink href={place.googleMapsUri} variant="outline">
              Read All Reviews on Google Maps
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
