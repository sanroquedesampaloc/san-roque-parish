import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import type { BlockContent } from "../../../sanity.types";

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const asset = (value as { asset?: unknown })?.asset;
      if (!asset) return null;
      const alt = (value as { alt?: string }).alt ?? "";
      const caption = (value as { caption?: string }).caption;

      return (
        <figure className="my-8 border border-border overflow-hidden shadow-premium">
          <Image
            src={urlFor(value as Parameters<typeof urlFor>[0])
              .width(900)
              .height(560)
              .url()}
            alt={alt}
            width={900}
            height={560}
            className="w-full h-auto"
          />
          {caption && (
            <figcaption className="px-4 py-3 text-xs text-charcoal-muted italic bg-ivory-warm">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
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
