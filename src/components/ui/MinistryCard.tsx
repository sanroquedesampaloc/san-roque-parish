import Link from "next/link";

type Ministry = {
  _id: string;
  name: string;
  slug: string;
  coordinator: string | null;
};

export function MinistryCard({ ministry }: { ministry: Ministry }) {
  return (
    <article className="group bg-white border border-border p-6 md:p-8 text-center hover:shadow-md transition-shadow hover:border-burgundy/20">
      <div className="w-14 h-14 mx-auto mb-5 bg-parchment rounded-full flex items-center justify-center">
        <svg
          className="w-6 h-6 text-burgundy"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
          />
        </svg>
      </div>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal mb-2 group-hover:text-burgundy transition-colors">
        <Link
          href={`/ministries#${ministry.slug}`}
          className="hover:text-burgundy transition-colors"
        >
          {ministry.name}
        </Link>
      </h3>
      {ministry.coordinator && (
        <p className="text-xs text-charcoal-muted">{ministry.coordinator}</p>
      )}
    </article>
  );
}
