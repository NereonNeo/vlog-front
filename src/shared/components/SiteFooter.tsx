import Link from "next/link";

const links = [
  { label: "GitHub", href: "https://github.com/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "Telegram", href: "https://t.me/" },
  { label: "Email", href: "mailto:hello@yakub.dev" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border-soft)] bg-[rgba(8,10,14,0.85)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Yakub. All rights reserved.</p>
        <div className="flex flex-wrap items-center gap-4">
          {links.map((link) => (
            <Link key={link.label} href={link.href} className="focus-ring transition hover:text-white">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
