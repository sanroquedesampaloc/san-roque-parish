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
    <footer className="bg-charcoal text-white/80">
      <div className="container-parish py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-bold font-serif text-white mb-4">
              {settings?.parishName ?? "San Roque de Sampaloc Parish"}
            </h3>
            {settings?.address && (
              <p className="text-sm leading-relaxed">{settings.address}</p>
            )}
            {settings?.phone && (
              <p className="text-sm mt-2">Tel: {settings.phone}</p>
            )}
            {settings?.email && (
              <p className="text-sm mt-1">Email: {settings.email}</p>
            )}
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
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
            <h4 className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
              Connect With Us
            </h4>
            <ul className="space-y-2.5">
              {settings?.facebookUrl && (
                <li>
                  <a
                    href={settings.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-white transition-colors inline-flex items-center gap-2"
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
                    className="text-sm hover:text-white transition-colors inline-flex items-center gap-2"
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
                    className="text-sm hover:text-white transition-colors inline-flex items-center gap-2"
                  >
                    Messenger
                  </a>
                </li>
              )}
            </ul>
          </div>

          {settings?.footerInfo && (
            <div>
              <h4 className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
                Parish Information
              </h4>
              <div className="text-sm [&_p]:text-white/80 [&_p]:mb-2 [&_a]:text-gold [&_a]:hover:text-gold-light">
                <PortableTextRenderer value={settings.footerInfo} />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-parish py-6 text-center text-sm text-white/50">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            {settings?.parishName ?? "San Roque de Sampaloc Parish"}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
