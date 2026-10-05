import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function SacramentsSection({
  sacraments,
}: {
  sacraments: Array<{
    _id: string;
    name: string;
    slug: string;
  }>;
}) {
  if (sacraments.length === 0) return null;

  return (
    <Section bg="white" spacing="loose">
      <Container>
        <SectionHeading
          title="The Sacraments"
          subtitle="Grace made visible through sacred rites"
          size="large"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {sacraments.map((sac) => (
            <Link
              key={sac._id}
              href={`/sacraments/${sac.slug}`}
              className="group bg-ivory rounded-xl p-6 md:p-8 text-center hover:shadow-lg transition-all border border-border-light hover:border-burgundy/20 hover:-translate-y-0.5"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-burgundy/10 flex items-center justify-center group-hover:bg-burgundy/15 transition-colors">
                <svg className="w-7 h-7 text-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-charcoal group-hover:text-burgundy transition-colors">{sac.name}</h3>
              <p className="text-sm text-charcoal-muted mt-2">Learn more &rarr;</p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <ButtonLink href="/sacraments" variant="outline">
            Learn More About the Sacraments
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
