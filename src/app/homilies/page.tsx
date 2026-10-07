import type { Metadata } from "next";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { HOMILIES_LIST_QUERY } from "@/sanity/lib/queries/homilies";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { HomilyCard } from "@/components/ui/HomilyCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { parseDateString } from "@/lib/dates";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Homilies",
  description:
    "Listen to and reflect on homilies from San Roque de Sampaloc Parish.",
};

export default async function HomiliesPage() {
  const { data: homilies } = await sanityFetch({
    query: HOMILIES_LIST_QUERY,
  });

  const featured = homilies[0] ?? null;
  const rest = homilies.slice(1);

  return (
    <>
      <Breadcrumbs items={[{ name: "Homilies" }]} />
      <PageHero
        title="Homilies"
        subtitle="Reflections on Scripture from our parish celebrations."
      />

      <Section bg="default">
        <Container>
          {homilies.length === 0 ? (
            <EmptyState
              message="No homilies have been published yet. Check back soon."
              cta={{ href: "/", label: "Return Home" }}
            />
          ) : (
            <div className="max-w-5xl mx-auto">
              {featured && (
                <article className="bg-white border border-border overflow-hidden mb-12">
                  <div className="md:flex">
                    <div className="md:w-2 bg-burgundy flex-shrink-0" aria-hidden="true" />
                    <div className="p-8 md:p-10 flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        {featured.liturgicalOccasion && (
                          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-burgundy bg-gold/15 px-3 py-1">
                            {featured.liturgicalOccasion}
                          </span>
                        )}
                        <time
                          dateTime={featured.date}
                          className="text-[11px] text-charcoal-muted tracking-wide"
                        >
                          {parseDateString(featured.date).toLocaleDateString("en-PH", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </time>
                      </div>

                      <h2 className="text-2xl md:text-3xl font-semibold text-charcoal mb-3 leading-snug">
                        <Link
                          href={`/homilies/${featured.slug}`}
                          className="hover:text-burgundy transition-colors"
                        >
                          {featured.title}
                        </Link>
                      </h2>

                      {featured.celebrant && (
                        <p className="text-sm text-charcoal-light mb-3">
                          by {featured.celebrant}
                        </p>
                      )}

                      {featured.description && (
                        <p className="text-charcoal-light text-base leading-relaxed line-clamp-4 max-w-2xl mb-5">
                          {featured.description}
                        </p>
                      )}

                      <ButtonLink href={`/homilies/${featured.slug}`} variant="outline">
                        View Homily
                      </ButtonLink>
                    </div>
                  </div>
                </article>
              )}

              {rest.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((homily) => (
                    <HomilyCard key={homily._id} homily={homily} />
                  ))}
                </div>
              )}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
