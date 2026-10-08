import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { PARISH_SETTINGS_QUERY } from "@/sanity/lib/queries/parish";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description:
    "How San Roque de Sampaloc Parish handles information shared through our Contact and Prayer Request forms.",
};

export default async function PrivacyPage() {
  const { data: settings } = await sanityFetch({ query: PARISH_SETTINGS_QUERY });
  const contactEmail = settings?.email;

  return (
    <>
      <Breadcrumbs items={[{ name: "Privacy Notice" }]} />
      <PageHero
        eyebrow="Your Information"
        title="Privacy Notice"
        subtitle="How we handle what you share with us through this website."
      />

      <Section bg="default">
        <Container>
          <div className="max-w-2xl mx-auto space-y-10 text-charcoal-light leading-relaxed">
            <p>
              This page explains, in plain language, what happens to the
              information you share with us through the Contact and Prayer
              Request forms on this website.
            </p>

            <div>
              <h2 className="text-lg font-semibold text-charcoal mb-3">
                What we collect
              </h2>
              <p className="mb-3">
                The <strong>Contact form</strong> asks for your name, email,
                optional phone number, subject, and message.
              </p>
              <p>
                The <strong>Prayer Request form</strong> asks only for your
                prayer intention. Your name and email are optional, and are
                only required if you check the box asking someone from the
                parish to contact you.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-charcoal mb-3">
                Why we collect it
              </h2>
              <p>
                We use this information solely to respond to your message or
                to hold your intention in prayer. Prayer requests are read by
                parish staff and clergy involved in our prayer ministry — not
                published or shared publicly.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-charcoal mb-3">
                How it&rsquo;s delivered and kept
              </h2>
              <p>
                Form submissions are sent as an email to the parish office
                using Resend, a transactional email delivery service — they
                are not stored in a database on this website. We keep
                messages only as long as needed to respond to you or to
                continue praying for your intention, and we do not sell or
                share your information with third parties for marketing
                purposes.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-charcoal mb-3">
                Keeping our forms free of spam
              </h2>
              <p>
                Our Contact and Prayer Request forms use Cloudflare Turnstile,
                a privacy-friendly anti-spam check, to help confirm that a
                submission is coming from a real visitor rather than an
                automated script. It runs only on those two pages.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-charcoal mb-3">
                The technology behind this website
              </h2>
              <p>
                The parish news, events, homilies, and other content you see
                on this site are managed through Sanity, a content management
                platform, which also hosts the images used throughout the
                site. This is infrastructure for running the website — it
                does not involve any personal information you submit through
                our forms.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-charcoal mb-3">
                Optional external content
              </h2>
              <p className="mb-3">
                Some pages can show embedded content from outside services —
                a Google Map on our Contact page and homepage, and a Facebook
                video player when Mass is being streamed live. These are
                optional: we don&rsquo;t load them until you choose to, either
                by allowing &ldquo;External Media&rdquo; in the cookie banner
                or preferences panel, or by clicking directly on an individual
                map or video to load it.
              </p>
              <p>
                If you choose to load one of these embeds, your browser
                connects directly to Google or Facebook, and that company may
                process data about your visit according to its own privacy
                practices, which are outside our control. You can always use
                the plain &ldquo;Get Directions&rdquo; or &ldquo;Watch on
                Facebook&rdquo; links instead, which open the map or the
                parish Facebook page directly without loading anything on
                this site.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-charcoal mb-3">
                Remembering your cookie preference
              </h2>
              <p>
                If you make a choice about external media, we save that
                choice in a single first-party cookie on your device
                (&ldquo;parish_consent&rdquo;) so we don&rsquo;t ask again on
                every visit. It stores only your preference and the date it
                was set — nothing that identifies you. You can change your
                choice at any time using the &ldquo;Cookie Preferences&rdquo;
                link in the footer of any page.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-charcoal mb-3">
                No analytics or advertising
              </h2>
              <p>
                We do not use Google Analytics, Meta/Facebook Pixel, or any
                similar analytics or advertising technology on this website.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-charcoal mb-3">
                A note on sensitive information
              </h2>
              <p>
                When sharing a prayer intention, please include only what
                feels comfortable. There&rsquo;s no need to provide medical,
                financial, or other sensitive personal details for us to pray
                for you and your loved ones.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-charcoal mb-3">
                Questions
              </h2>
              <p>
                If you have questions about how your information is handled,
                please contact the parish office
                {contactEmail ? (
                  <>
                    {" "}
                    at{" "}
                    <a
                      href={`mailto:${contactEmail}`}
                      className="text-burgundy hover:text-burgundy-light transition-colors"
                    >
                      {contactEmail}
                    </a>
                  </>
                ) : (
                  " using the details on our Contact page"
                )}
                .
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
