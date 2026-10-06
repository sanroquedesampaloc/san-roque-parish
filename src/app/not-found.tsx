import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page you are looking for may have been moved or no longer exists.",
};

export default function NotFound() {
  return (
    <div className="bg-ivory py-24 md:py-32 lg:py-40">
      <Container>
        <div className="max-w-lg mx-auto text-center">
          {/* Decorative cross */}
          <div className="mb-8" aria-hidden="true">
            <svg
              className="w-16 h-16 mx-auto text-burgundy/20"
              viewBox="0 0 80 80"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
            >
              <path d="M40 10v60M20 35h40" strokeLinecap="round" />
              <circle cx="40" cy="35" r="6" />
            </svg>
          </div>

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-dark mb-4">
            404
          </p>

          <h1 className="text-3xl md:text-4xl font-semibold font-serif text-charcoal leading-tight">
            Page Not Found
          </h1>

          <p className="mt-4 text-charcoal-light leading-relaxed">
            The page you are looking for may have been moved or no longer exists.
          </p>

          <div className="mt-4 h-px w-12 bg-gold mx-auto" aria-hidden="true" />

          <div className="mt-8">
            <ButtonLink href="/" variant="outline">
              Return Home
            </ButtonLink>
          </div>
        </div>
      </Container>
    </div>
  );
}
