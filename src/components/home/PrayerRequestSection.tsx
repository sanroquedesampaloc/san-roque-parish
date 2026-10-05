import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

export function PrayerRequestSection() {
  return (
    <Section bg="burgundy" spacing="loose">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5">
            Need Prayers?
          </h2>
          <p className="text-lg md:text-xl text-white/85 mb-8 leading-relaxed max-w-2xl mx-auto">
            Our parish community is here for you. Reach out and let us lift your
            intentions in prayer.
          </p>
          <div className="h-px w-20 bg-gold/50 mx-auto mb-8" aria-hidden="true" />
          <p className="text-white/60 text-sm">
            Prayer request form coming soon. In the meantime, please visit the
            parish office or contact us directly.
          </p>
        </div>
      </Container>
    </Section>
  );
}
