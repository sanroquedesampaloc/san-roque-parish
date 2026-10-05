import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
        <SectionHeading
          title="Latest Homily"
          subtitle="Reflect on the Word of God"
        />
        <div className="max-w-4xl mx-auto">
          <article className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
            <div className="md:flex">
              <div className="md:w-1/3 bg-burgundy p-6 md:p-8 flex flex-col justify-center text-white">
                <div className="text-5xl leading-none text-gold/40 font-serif mb-3" aria-hidden="true">&ldquo;</div>
                {homily.liturgicalOccasion && (
                  <span className="text-sm font-semibold uppercase tracking-wider text-gold mb-3 block">
                    {homily.liturgicalOccasion}
                  </span>
                )}
                <time
                  dateTime={homily.date}
                  className="text-sm text-white/70"
                >
                  {parseDateString(homily.date).toLocaleDateString("en-PH", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
                {homily.celebrant && (
                  <p className="text-sm text-white/80 mt-2">
                    by {homily.celebrant}
                  </p>
                )}
              </div>
              <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-center">
                <h3 className="text-xl md:text-2xl font-bold text-charcoal mb-3">
                  <Link
                    href={`/homilies/${homily.slug}`}
                    className="hover:text-burgundy transition-colors"
                  >
                    {homily.title}
                  </Link>
                </h3>
                {homily.description && (
                  <p className="text-charcoal-light leading-relaxed line-clamp-4 mb-4">
                    {homily.description}
                  </p>
                )}
                <div>
                  <Link
                    href={`/homilies/${homily.slug}`}
                    className="text-sm font-semibold text-burgundy hover:text-burgundy-light transition-colors"
                  >
                    Read Full Homily &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </div>
        <div className="text-center mt-10">
          <ButtonLink href="/homilies" variant="outline">
            View All Homilies
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
