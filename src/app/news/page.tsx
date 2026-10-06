import type { Metadata } from "next";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { ANNOUNCEMENTS_LIST_QUERY } from "@/sanity/lib/queries/announcements";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { AnnouncementCard } from "@/components/ui/AnnouncementCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { parseDateString } from "@/lib/dates";
import { categoryLabels } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Parish News",
  description:
    "Stay updated with the latest announcements and news from San Roque de Sampaloc Parish.",
};

export default async function NewsPage() {
  const { data: announcements } = await sanityFetch({
    query: ANNOUNCEMENTS_LIST_QUERY,
  });

  const featured = announcements[0] ?? null;
  const rest = announcements.slice(1);

  return (
    <>
      <PageHero
        title="Parish News"
        subtitle="Announcements, updates, and stories from our parish community."
      />

      <Section bg="default">
        <Container>
          {announcements.length === 0 ? (
            <EmptyState
              message="No announcements at this time. Check back soon for parish updates."
              cta={{ href: "/", label: "Return Home" }}
            />
          ) : (
            <div className="max-w-5xl mx-auto">
              {/* Featured / Latest */}
              {featured && (
                <article className="bg-white border border-border overflow-hidden md:flex mb-10">
                  <div className="md:w-2 bg-burgundy flex-shrink-0" aria-hidden="true" />
                  <div className="p-8 md:p-10 flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white bg-burgundy px-3 py-1">
                        {categoryLabels[featured.category] ?? featured.category}
                      </span>
                      <time
                        dateTime={featured.publishedAt}
                        className="text-[11px] text-charcoal-muted tracking-wide"
                      >
                        {parseDateString(featured.publishedAt).toLocaleDateString("en-PH", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </time>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-semibold text-charcoal mb-3 leading-snug">
                      <Link
                        href={`/news/${featured.slug}`}
                        className="hover:text-burgundy transition-colors"
                      >
                        {featured.title}
                      </Link>
                    </h2>
                    {featured.excerpt && (
                      <p className="text-charcoal-light text-base leading-relaxed line-clamp-4 max-w-2xl mb-4">
                        {featured.excerpt}
                      </p>
                    )}
                    <Link
                      href={`/news/${featured.slug}`}
                      className="inline-block text-xs font-semibold uppercase tracking-wider text-burgundy hover:text-burgundy-light transition-colors"
                    >
                      Read More &rarr;
                    </Link>
                  </div>
                </article>
              )}

              {/* Rest */}
              {rest.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((item) => (
                    <AnnouncementCard key={item._id} announcement={item} />
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
