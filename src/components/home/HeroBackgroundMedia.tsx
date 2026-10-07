"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/**
 * Full-bleed hero background: a decorative looping video on tablet/desktop
 * for users with no motion-reduction preference, and the static poster
 * image everywhere else (mobile widths, prefers-reduced-motion: reduce,
 * and before JS has run / with JS disabled).
 *
 * This is a client component specifically so the <video> element is never
 * added to the DOM for users who shouldn't get it. A pure-CSS
 * (display: none) approach was tried first and measured with Playwright:
 * even with the video hidden via CSS and `preload="none"`, Chromium still
 * issued a full network request for hero-loop.webm for both
 * prefers-reduced-motion and sub-768px viewports (the `autoplay` attribute
 * causes the browser to fetch regardless of CSS visibility). Only
 * conditionally mounting the element actually prevents the fetch.
 *
 * The initial/server-rendered state is always the static image, so there
 * is no hydration mismatch and no-JS users simply keep the image forever.
 */
export function HeroBackgroundMedia() {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const widthQuery = window.matchMedia("(min-width: 768px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      setShowVideo(widthQuery.matches && !motionQuery.matches);
    };

    update();
    widthQuery.addEventListener("change", update);
    motionQuery.addEventListener("change", update);

    return () => {
      widthQuery.removeEventListener("change", update);
      motionQuery.removeEventListener("change", update);
    };
  }, []);

  // The reliquary sits right-of-center in the source footage. Below lg
  // (1024px) the hero keeps the text full-width/stacked (see HeroSection),
  // so the image just needs to frame the subject attractively within the
  // top/bottom vignette — slightly right and a bit high so it isn't
  // cropped awkwardly at tall/narrow tablet-portrait ratios. From lg up,
  // the layout splits into text-left/reliquary-right, so the subject is
  // pushed further right to clear the text column, then eases back toward
  // its natural position once there's enough width (xl+) that cropping is
  // no longer severe.
  const objectPosition =
    "object-[62%_38%] lg:object-[70%_50%] xl:object-[58%_50%]";

  if (!showVideo) {
    return (
      <Image
        src="/hero.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className={`object-cover ${objectPosition}`}
        aria-hidden="true"
        data-testid="hero-poster"
      />
    );
  }

  return (
    <video
      className={`absolute inset-0 h-full w-full object-cover ${objectPosition}`}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      poster="/hero.png"
      aria-hidden="true"
      data-testid="hero-video"
    >
      <source src="/hero-loop.webm" type="video/webm" />
    </video>
  );
}
