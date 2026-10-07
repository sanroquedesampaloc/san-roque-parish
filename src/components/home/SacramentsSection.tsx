import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";

const sacramentIcons: Record<string, string> = {
  baptism: "M12 3v18M8 7c0-2 4-4 4-4s4 2 4 4M6 12h12",
  confirmation: "M12 3l2 7h7l-5.5 4 2 7L12 17l-5.5 4 2-7L3 10h7z",
  eucharist: "M12 2v20M7 8h10M9 14h6M8 5a4 4 0 018 0",
  reconciliation: "M12 3v18M3 12h18",
  marriage: "M8 12a4 4 0 018 0M4 12a8 8 0 0116 0M12 4v2M12 18v2",
  "anointing-of-the-sick": "M12 3v18M6 9h12M9 15h6",
  "holy-orders": "M12 2v20M7 7h10M9 12h6",
};

function getSacramentIcon(slug: string) {
  return sacramentIcons[slug] || "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25";
}

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
    <Section bg="warm" spacing="loose">
      <Container>
        <SectionHeading
          eyebrow="Sacred Rites"
          title="The Sacraments"
          size="large"
        />
        <div
          className={`max-w-4xl mx-auto grid gap-4 ${
            sacraments.length === 1
              ? "grid-cols-1 max-w-sm"
              : sacraments.length <= 3
              ? "grid-cols-1 sm:grid-cols-3"
              : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
          }`}
        >
          {sacraments.map((sac) => (
            <Link
              key={sac._id}
              href={`/mass-sacraments#${sac.slug}`}
              className="group bg-white border border-border p-6 text-center card-premium hover:border-burgundy/20"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-parchment flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-burgundy"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={getSacramentIcon(sac.slug)} />
                </svg>
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal group-hover:text-burgundy transition-colors">
                {sac.name}
              </h3>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <ButtonLink href="/mass-sacraments" variant="outline">
            Explore Sacraments
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
