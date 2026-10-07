import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { parseDateString } from "@/lib/dates";

export function LatestHomilySection({
  homily,
}: {
  homily: {
    _id: string;
    title: string;
    slug: string;
    date: string;
    celebrant: string | null;
    description: string | null;
    liturgicalOccasion: string | null;
  } | null;
}) {
  if (!homily) return null;

  return (
    <Section bg="default">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 overflow-hidden border border-border bg-white shadow-premium">
            <div className="lg:col-span-2 bg-burgundy-dark text-white p-8 md:p-10 flex flex-col justify-between relative">
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0v40M0 20h40' stroke='%23ffffff' stroke-width='0.3' fill='none'/%3E%3C/svg%3E\")",
                  backgroundSize: "40px 40px",
                }}
                aria-hidden="true"
              />
              <div className="relative">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-light mb-6">
                  Latest Homily
                </p>
                <div className="text-5xl leading-none text-gold/30 font-serif mb-4" aria-hidden="true">&ldquo;</div>
                {homily.liturgicalOccasion && (
                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gold block mb-4">
                    {homily.liturgicalOccasion}
                  </span>
                )}
                <time
                  dateTime={homily.date}
                  className="text-sm text-white/60 block"
                >
                  {parseDateString(homily.date).toLocaleDateString("en-PH", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
                {homily.celebrant && (
                  <p className="text-sm text-white/70 mt-2">
                    by {homily.celebrant}
                  </p>
                )}
              </div>
            </div>

            <div className="lg:col-span-3 p-8 md:p-10 flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl font-semibold text-charcoal mb-4 leading-snug">
                <Link
                  href={`/homilies/${homily.slug}`}
                  className="hover:text-burgundy transition-colors"
                >
                  {homily.title}
                </Link>
              </h2>
              {homily.description && (
                <p className="text-charcoal-light leading-relaxed line-clamp-4 mb-6">
                  {homily.description}
                </p>
              )}
              <div>
                <Link
                  href={`/homilies/${homily.slug}`}
                  className="text-xs font-semibold uppercase tracking-wider text-burgundy hover:text-burgundy-light transition-colors"
                >
                  Read Full Homily &rarr;
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <ButtonLink href="/homilies" variant="outline">
              View All Homilies
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
