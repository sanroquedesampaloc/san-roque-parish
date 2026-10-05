import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MinistryCard } from "@/components/ui/MinistryCard";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function MinistriesSection({
  ministries,
}: {
  ministries: Array<{
    _id: string;
    name: string;
    slug: string;
    coordinator: string | null;
  }>;
}) {
  if (ministries.length === 0) return null;

  const display = ministries.slice(0, 6);

  return (
    <Section bg="white">
      <Container>
        <SectionHeading
          eyebrow="Serve the Lord"
          title="Our Ministries"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {display.map((ministry) => (
            <MinistryCard key={ministry._id} ministry={ministry} />
          ))}
        </div>
        {ministries.length > 6 && (
          <div className="text-center mt-10">
            <ButtonLink href="/ministries" variant="outline">
              View All Ministries
            </ButtonLink>
          </div>
        )}
      </Container>
    </Section>
  );
}
