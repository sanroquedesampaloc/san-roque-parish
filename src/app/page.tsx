import { sanityFetch } from "@/sanity/lib/live";
import { PARISH_SETTINGS_QUERY } from "@/sanity/lib/queries/parish";
import { MINISTRIES_LIST_QUERY, SACRAMENTS_LIST_QUERY } from "@/sanity/lib/queries/parish";
import { FEATURED_ANNOUNCEMENT_QUERY, ANNOUNCEMENTS_LIST_QUERY } from "@/sanity/lib/queries/announcements";
import { UPCOMING_EVENTS_QUERY } from "@/sanity/lib/queries/events";
import { LATEST_HOMILY_QUERY } from "@/sanity/lib/queries/homilies";
import { HeroSection } from "@/components/home/HeroSection";
import { MassScheduleSection } from "@/components/home/MassScheduleSection";
import { FeaturedAnnouncementSection } from "@/components/home/FeaturedAnnouncementSection";
import { UpcomingEventsSection } from "@/components/home/UpcomingEventsSection";
import { SacramentsSection } from "@/components/home/SacramentsSection";
import { LatestHomilySection } from "@/components/home/LatestHomilySection";
import { MinistriesSection } from "@/components/home/MinistriesSection";
import { PrayerRequestSection } from "@/components/home/PrayerRequestSection";
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
  ] = await Promise.all([
    sanityFetch({ query: PARISH_SETTINGS_QUERY }),
    sanityFetch({ query: FEATURED_ANNOUNCEMENT_QUERY }),
    sanityFetch({ query: ANNOUNCEMENTS_LIST_QUERY }),
    sanityFetch({ query: UPCOMING_EVENTS_QUERY }),
    sanityFetch({ query: SACRAMENTS_LIST_QUERY }),
    sanityFetch({ query: LATEST_HOMILY_QUERY }),
    sanityFetch({ query: MINISTRIES_LIST_QUERY }),
  ]);

  return (
    <>
      <HeroSection settings={settings} />
      <MassScheduleSection settings={settings} />
      <FeaturedAnnouncementSection featuredAnnouncement={featuredAnnouncement} announcements={announcements} />
      <UpcomingEventsSection events={events} />
      <SacramentsSection sacraments={sacraments} />
      <LatestHomilySection homily={homily} />
      <MinistriesSection ministries={ministries} />
      <PrayerRequestSection />
      <SupportParishSection settings={settings} />
      <VisitContactSection settings={settings} />
    </>
  );
}
