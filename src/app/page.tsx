import { sanityFetch } from "@/sanity/lib/live";
import { PARISH_SETTINGS_QUERY } from "@/sanity/lib/queries/parish";
import { MINISTRIES_LIST_QUERY, SACRAMENTS_LIST_QUERY } from "@/sanity/lib/queries/parish";
import { FEATURED_ANNOUNCEMENT_QUERY, ANNOUNCEMENTS_LIST_QUERY } from "@/sanity/lib/queries/announcements";
import { UPCOMING_EVENTS_QUERY } from "@/sanity/lib/queries/events";
import { LATEST_HOMILY_QUERY } from "@/sanity/lib/queries/homilies";
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
    placeDetails,
  ] = await Promise.all([
    sanityFetch({ query: PARISH_SETTINGS_QUERY }),
    sanityFetch({ query: FEATURED_ANNOUNCEMENT_QUERY }),
    sanityFetch({ query: ANNOUNCEMENTS_LIST_QUERY }),
    sanityFetch({ query: UPCOMING_EVENTS_QUERY }),
    sanityFetch({ query: SACRAMENTS_LIST_QUERY }),
    sanityFetch({ query: LATEST_HOMILY_QUERY }),
    sanityFetch({ query: MINISTRIES_LIST_QUERY }),
    getPlaceDetails(),
  ]);

  return (
    <>
      <HeroSection settings={settings} />

      <ScrollReveal>
        <MassScheduleSection settings={settings} />
      </ScrollReveal>

      <SectionDivider bg="ivory" />

      <ScrollReveal delay={80}>
        <FeaturedAnnouncementSection featuredAnnouncement={featuredAnnouncement} announcements={announcements} />
      </ScrollReveal>

      <SectionDivider bg="white" />

      <ScrollReveal delay={80}>
        <UpcomingEventsSection events={events} />
      </ScrollReveal>

      <SectionDivider bg="ivory-warm" />

      <ScrollReveal delay={80}>
        <SacramentsSection sacraments={sacraments} />
      </ScrollReveal>

      <SectionDivider bg="ivory" />

      <ScrollReveal delay={80}>
        <LatestHomilySection homily={homily} />
      </ScrollReveal>

      <SectionDivider bg="white" />

      <ScrollReveal delay={80}>
        <MinistriesSection ministries={ministries} />
      </ScrollReveal>

      <ScrollReveal>
        <PrayerRequestSection />
      </ScrollReveal>

      <ScrollReveal delay={80}>
        <GoogleReviewsSection place={placeDetails} />
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
