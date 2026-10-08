import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/live";
import { HOMILY_BY_SLUG_QUERY } from "@/sanity/lib/queries/homilies";
import { urlFor } from "@/sanity/lib/image";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { parseDateString } from "@/lib/dates";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data: homily } = await sanityFetch({
    query: HOMILY_BY_SLUG_QUERY,
    params: { slug },
  });

  if (!homily) {
    return { title: "Homily Not Found" };
  }

  return {
    title: homily.title,
    description: homily.description ?? `Homily: ${homily.title}`,
    alternates: { canonical: `/homilies/${slug}` },
  };
}

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match?.[1] ?? null;
}

function getVimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match?.[1] ?? null;
}

export default async function HomilyDetailPage({ params }: Props) {
  const { slug } = await params;
  const { data: homily } = await sanityFetch({
    query: HOMILY_BY_SLUG_QUERY,
    params: { slug },
  });

  if (!homily) {
    notFound();
  }

  const hasThumbnail = homily.thumbnail?.asset;
  const youtubeId = homily.videoUrl ? getYouTubeId(homily.videoUrl) : null;
  const vimeoId = !youtubeId && homily.videoUrl ? getVimeoId(homily.videoUrl) : null;
  const hasEmbed = youtubeId || vimeoId;

  return (
    <>
      <Breadcrumbs items={[{ name: "Homilies", href: "/homilies" }, { name: homily.title }]} />
      <PageHero
        title={homily.title}
        backLink={{ href: "/homilies", label: "Back to Homilies" }}
      />

      <Section bg="default" spacing="compact">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Metadata block */}
            <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-border">
              {homily.liturgicalOccasion && (
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-burgundy bg-gold/15 px-3 py-1">
                  {homily.liturgicalOccasion}
                </span>
              )}
              <time
                dateTime={homily.date}
                className="text-sm text-charcoal-muted"
              >
                {parseDateString(homily.date).toLocaleDateString("en-PH", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
              {homily.celebrant && (
                <span className="text-sm text-charcoal-light">
                  by <span className="font-medium text-charcoal">{homily.celebrant}</span>
                </span>
              )}
            </div>

            {/* Video embed — framed as a deliberate "screening," not a raw iframe */}
            {hasEmbed && (
              <div className="mb-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold-dark mb-3">
                  Watch
                </p>
                <div className="border border-border bg-ivory-warm p-2.5 md:p-3">
                  <div className="relative w-full pb-[56.25%] bg-charcoal overflow-hidden">
                    {youtubeId && (
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
                        title={`Video: ${homily.title}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                        className="absolute inset-0 w-full h-full border-0"
                      />
                    )}
                    {vimeoId && (
                      <iframe
                        src={`https://player.vimeo.com/video/${vimeoId}?dnt=1`}
                        title={`Video: ${homily.title}`}
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                        className="absolute inset-0 w-full h-full border-0"
                      />
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Non-embeddable video link */}
            {homily.videoUrl && !hasEmbed && (
              <div className="mb-10 bg-ivory-warm border border-border p-6 flex items-center gap-4">
                <div className="w-10 h-10 bg-burgundy rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-charcoal mb-1">Watch this homily</p>
                  <a
                    href={homily.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-burgundy hover:text-burgundy-light transition-colors"
                  >
                    Open Video &rarr;
                  </a>
                </div>
              </div>
            )}

            {/* Thumbnail (shown only if no video embed) */}
            {hasThumbnail && !hasEmbed && (
              <div className="mb-10 border border-border overflow-hidden">
                <Image
                  src={urlFor(homily.thumbnail!).width(960).height(540).url()}
                  alt={homily.thumbnail!.alt ?? homily.title}
                  width={960}
                  height={540}
                  sizes="(min-width: 896px) 896px, 100vw"
                  className="w-full h-auto"
                  priority
                />
              </div>
            )}

            {/* Description */}
            {homily.description && (
              <div className="max-w-[42rem]">
                <p className="text-charcoal-light text-base md:text-lg leading-relaxed">
                  {homily.description}
                </p>
              </div>
            )}

            {/* Fallback when no video, no thumbnail, no description */}
            {!homily.videoUrl && !hasThumbnail && !homily.description && (
              <p className="text-charcoal-muted">
                More details about this homily will be available soon.
              </p>
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}
