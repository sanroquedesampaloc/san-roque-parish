import { sanityFetch } from "@/sanity/lib/live";
import { PARISH_SETTINGS_QUERY } from "@/sanity/lib/queries/parish";
import { MINISTRIES_LIST_QUERY, SACRAMENTS_LIST_QUERY } from "@/sanity/lib/queries/parish";
import { FEATURED_ANNOUNCEMENT_QUERY, ANNOUNCEMENTS_LIST_QUERY } from "@/sanity/lib/queries/announcements";
import { UPCOMING_EVENTS_QUERY } from "@/sanity/lib/queries/events";
import { LATEST_HOMILY_QUERY } from "@/sanity/lib/queries/homilies";
import { FAQS_LIST_QUERY } from "@/sanity/lib/queries/faqs";
import { getPlaceDetails } from "@/lib/google-places";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { HeroSection } from "@/components/home/HeroSection";
import { MassScheduleSection } from "@/components/home/MassScheduleSection";
import { FeaturedAnnouncementSection } from "@/components/home/FeaturedAnnouncementSection";
import { UpcomingEventsSection } from "@/components/home/UpcomingEventsSection";
import { SacramentsSection } from "@/components/home/SacramentsSection";
import { LatestHomilySection } from "@/components/home/LatestHomilySection";
import { MinistriesSection } from "@/components/home/MinistriesSection";
import { PrayerRequestSection } from "@/components/home/PrayerRequestSection";
import { GoogleReviewsSection } from "@/components/home/GoogleReviewsSection";
import { FAQSection } from "@/components/home/FAQSection";
import { SupportParishSection } from "@/components/home/SupportParishSection";
import { VisitContactSection } from "@/components/home/VisitContactSection";

export default async function HomePage() {
  const [
    { data: settings },
    { data: featuredAnnouncement },
    { data: announcements },
    { data: events },
    { data: sacraments },
    { data: homily },
    { data: ministries },
    { data: faqs },
    placeDetails,
  ] = await Promise.all([
    sanityFetch({ query: PARISH_SETTINGS_QUERY }),
    sanityFetch({ query: FEATURED_ANNOUNCEMENT_QUERY }),
    sanityFetch({ query: ANNOUNCEMENTS_LIST_QUERY }),
    sanityFetch({ query: UPCOMING_EVENTS_QUERY }),
    sanityFetch({ query: SACRAMENTS_LIST_QUERY }),
    sanityFetch({ query: LATEST_HOMILY_QUERY }),
    sanityFetch({ query: MINISTRIES_LIST_QUERY }),
    sanityFetch({ query: FAQS_LIST_QUERY }),
    getPlaceDetails(),
  ]);

  // Each divider below sits between two sections; several of those sections
  // hide themselves entirely when there's no content yet. Gating the divider
  // on the section it introduces avoids two decorative dividers rendering
  // back-to-back with nothing between them (see docs/LAUNCH-CHECKLIST.md).
  const hasFeaturedAnnouncement = Boolean(featuredAnnouncement ?? announcements[0]);
  const hasEvents = events.length > 0;
  const hasSacraments = sacraments.length > 0;
  const hasHomily = Boolean(homily);
  const hasMinistries = ministries.length > 0;
  const hasFaqs = faqs.length > 0;

  return (
    <>
      <HeroSection settings={settings} />

      <ScrollReveal>
        <MassScheduleSection settings={settings} />
      </ScrollReveal>

      {hasFeaturedAnnouncement && <SectionDivider bg="ivory" />}

      <ScrollReveal delay={80}>
        <FeaturedAnnouncementSection featuredAnnouncement={featuredAnnouncement} announcements={announcements} />
      </ScrollReveal>

      {hasEvents && <SectionDivider bg="white" />}

      <ScrollReveal delay={80}>
        <UpcomingEventsSection events={events} />
      </ScrollReveal>

      {hasSacraments && <SectionDivider bg="ivory-warm" />}

      <ScrollReveal delay={80}>
        <SacramentsSection sacraments={sacraments} />
      </ScrollReveal>

      {hasHomily && <SectionDivider bg="ivory" />}

      <ScrollReveal delay={80}>
        <LatestHomilySection homily={homily} />
      </ScrollReveal>

      {hasMinistries && <SectionDivider bg="white" />}

      <ScrollReveal delay={80}>
        <MinistriesSection ministries={ministries} />
      </ScrollReveal>

      <ScrollReveal>
        <PrayerRequestSection />
      </ScrollReveal>

      <ScrollReveal delay={80}>
        <GoogleReviewsSection place={placeDetails} />
      </ScrollReveal>

      {hasFaqs && <SectionDivider bg="white" />}

      <ScrollReveal delay={80}>
        <FAQSection faqs={faqs} />
      </ScrollReveal>

      <SectionDivider bg="ivory-warm" />

      <ScrollReveal delay={80}>
        <SupportParishSection settings={settings} />
      </ScrollReveal>

      <ScrollReveal delay={80}>
        <VisitContactSection settings={settings} />
      </ScrollReveal>
    </>
  );
}
