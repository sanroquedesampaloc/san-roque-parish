import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/live";
import { ANNOUNCEMENT_BY_SLUG_QUERY } from "@/sanity/lib/queries/announcements";
import { urlFor } from "@/sanity/lib/image";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { PortableTextRenderer } from "@/components/ui/PortableTextRenderer";
import { parseDateString } from "@/lib/dates";
import { categoryLabels } from "@/lib/constants";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data: announcement } = await sanityFetch({
    query: ANNOUNCEMENT_BY_SLUG_QUERY,
    params: { slug },
  });

  if (!announcement) {
    return { title: "Announcement Not Found" };
  }

  return {
    title: announcement.title,
    description: announcement.excerpt ?? undefined,
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const { data: announcement } = await sanityFetch({
    query: ANNOUNCEMENT_BY_SLUG_QUERY,
    params: { slug },
  });

  if (!announcement) {
    notFound();
  }

  const hasImage = announcement.featuredImage?.asset;

  return (
    <>
      <Breadcrumbs items={[{ name: "News", href: "/news" }, { name: announcement.title }]} />
      <PageHero
        title={announcement.title}
        backLink={{ href: "/news", label: "Back to News" }}
      />

      <Section bg="default" spacing="compact">
        <Container>
          <article className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white bg-burgundy px-3 py-1">
                {categoryLabels[announcement.category] ?? announcement.category}
              </span>
              <time
                dateTime={announcement.publishedAt}
                className="text-sm text-charcoal-muted"
              >
                {parseDateString(announcement.publishedAt).toLocaleDateString("en-PH", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </div>

            {hasImage && (
              <div className="mb-10 border border-border overflow-hidden">
                <Image
                  src={urlFor(announcement.featuredImage!).width(960).height(480).url()}
                  alt={announcement.featuredImage!.alt ?? announcement.title}
                  width={960}
                  height={480}
                  className="w-full h-auto"
                  priority
                />
              </div>
            )}

            {announcement.body && (
              <div className="prose-parish">
                <PortableTextRenderer value={announcement.body} />
              </div>
            )}
          </article>
        </Container>
      </Section>
    </>
  );
}
