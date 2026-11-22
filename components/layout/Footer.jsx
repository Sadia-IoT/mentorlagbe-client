import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { CONTACT, PUBLIC_NAV } from "@/lib/constants";
import Logo from "./Logo";

const socials = [
  {
    label: "X",
    href: "https://x.com",
    path: "M18.9 2H22l-7.6 8.7L23.3 22h-7l-5.5-7.2L4.5 22H1.4l8.1-9.3L1 2h7.2l5 6.6L18.9 2Zm-1.2 18h1.7L6.4 3.9H4.6L17.7 20Z",
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    path: "M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.3-1.5 1.6-1.5h1.6V4.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.3H7.6V14h2.7v8h3.2Z",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    path: "M6.9 8.9H3.7V22h3.2V8.9ZM5.3 3.5a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM20.3 14.1c0-3.3-1.8-4.9-4.1-4.9-1.9 0-2.8 1-3.3 1.8V8.9H9.7V22h3.2v-7.3c0-1.9.9-2.8 2.2-2.8 1.3 0 2 .9 2 2.8V22h3.2v-7.9Z",
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    path: "M21.6 7.2c-.2-.9-.9-1.6-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4c-.9.2-1.6.9-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.8c.2.9.9 1.6 1.8 1.8 1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z",
  },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-surface">
      <div className="container-ml py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              A smarter way to find verified tutors and mentorship batches —
              built for students and tutors across Bangladesh.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition hover:border-brand/40 hover:bg-brand-soft hover:text-brand"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {PUBLIC_NAV.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-fg/80 transition hover:text-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/sign-up"
                  className="text-fg/80 transition hover:text-brand"
                >
                  Become a tutor
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
              Platform
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/dashboard" className="text-fg/80 transition hover:text-brand">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-fg/80 transition hover:text-brand">
                  Pro plans
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-fg/80 transition hover:text-brand">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/sign-in" className="text-fg/80 transition hover:text-brand">
                  Sign in
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <a href={`mailto:${CONTACT.email}`} className="hover:text-brand">
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="hover:text-brand">
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span>{CONTACT.location}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} MentorLagbe. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Made for curious learners
            <span className="text-accent">✳</span>
            Dhaka, Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
}
