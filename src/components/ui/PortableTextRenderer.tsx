import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { BlockContent } from "../../../sanity.types";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-charcoal mt-6 mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold text-charcoal mt-5 mb-2">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold text-charcoal mt-4 mb-2">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gold pl-4 italic text-charcoal-light my-4">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="text-charcoal-light leading-relaxed mb-4">{children}</p>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-burgundy underline hover:text-burgundy-light"
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={value?.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-1 mb-4 text-charcoal-light">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-1 mb-4 text-charcoal-light">
        {children}
      </ol>
    ),
  },
};

export function PortableTextRenderer({ value }: { value: BlockContent | null }) {
  if (!value) return null;
  return <PortableText value={value} components={components} />;
}
