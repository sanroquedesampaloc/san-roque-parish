import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "San Roque de Sampaloc Parish",
    short_name: "San Roque Parish",
    description:
      "A Catholic community of faith, worship, and service in Sampaloc, Manila.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF6EE",
    theme_color: "#6B1D2A",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
