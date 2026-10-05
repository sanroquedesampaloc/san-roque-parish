import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { PARISH_SETTINGS_QUERY } from "@/sanity/lib/queries/parish";
import { PortableTextRenderer } from "@/components/ui/PortableTextRenderer";

const quickLinks = [
  { href: "/sacraments", label: "Sacraments" },
  { href: "/ministries", label: "Ministries" },
  { href: "/announcements", label: "Announcements" },
  { href: "/events", label: "Events" },
  { href: "/homilies", label: "Homilies" },
  { href: "/contact", label: "Contact" },
];

export async function Footer() {
  const { data: settings } = await sanityFetch({ query: PARISH_SETTINGS_QUERY });

  return (
    <footer className="bg-charcoal text-white/75">
      <div className="h-px bg-gold/30" aria-hidden="true" />

      <div className="container-parish py-14 md:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M12 2v20M7 7h10M9 12h6" strokeLinecap="round" />
              </svg>
              <h3 className="text-base font-semibold font-serif text-white">
                {settings?.parishName ?? "San Roque de Sampaloc Parish"}
              </h3>
            </div>
            {settings?.address && (
              <p className="text-sm leading-relaxed">{settings.address}</p>
            )}
            {settings?.phone && (
              <p className="text-sm mt-2">{settings.phone}</p>
            )}
            {settings?.email && (
              <p className="text-sm mt-1">{settings.email}</p>
            )}
          </div>

          <div>
            <h4 className="text-[11px] font-semibold text-gold uppercase tracking-[0.15em] mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold text-gold uppercase tracking-[0.15em] mb-5">
              Connect With Us
            </h4>
            <ul className="space-y-2.5">
              {settings?.facebookUrl && (
                <li>
                  <a
                    href={settings.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Facebook
                  </a>
                </li>
              )}
              {settings?.youtubeUrl && (
                <li>
                  <a
                    href={settings.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-white transition-colors"
                  >
                    YouTube
                  </a>
                </li>
              )}
              {settings?.messengerUrl && (
                <li>
                  <a
                    href={settings.messengerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Messenger
                  </a>
                </li>
              )}
              {!settings?.facebookUrl && !settings?.youtubeUrl && !settings?.messengerUrl && (
                <li className="text-sm text-white/50 italic">Coming soon</li>
              )}
            </ul>
          </div>

          {settings?.footerInfo && (
            <div>
              <h4 className="text-[11px] font-semibold text-gold uppercase tracking-[0.15em] mb-5">
                Parish Information
              </h4>
              <div className="text-sm [&_p]:text-white/75 [&_p]:mb-2 [&_a]:text-gold [&_a]:hover:text-gold-light">
                <PortableTextRenderer value={settings.footerInfo} />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-parish py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            {settings?.parishName ?? "San Roque de Sampaloc Parish"}
          </p>
          <p>A Catholic Parish in the Archdiocese of Manila</p>
        </div>
      </div>
    </footer>
  );
}
