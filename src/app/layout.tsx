import type { Metadata } from "next";
import { EB_Garamond, Inter } from "next/font/google";
import { SanityLive } from "@/sanity/lib/live";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SITE_URL } from "@/lib/constants";
import "./globals.css";

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "San Roque de Sampaloc Parish",
    template: "%s | San Roque de Sampaloc Parish",
  },
  description:
    "Welcome to San Roque de Sampaloc Parish — a Catholic community of faith, worship, and service.",
  openGraph: {
    type: "website",
    siteName: "San Roque de Sampaloc Parish",
    locale: "en_PH",
  },
  twitter: {
    card: "summary",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${ebGaramond.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-burgundy focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:text-sm focus:font-semibold focus:outline-2 focus:outline-offset-2 focus:outline-burgundy"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
        <SanityLive />
      </body>
    </html>
  );
}
