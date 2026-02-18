import Link from "next/link";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Posts", href: "/posts" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-soft)] bg-[rgba(8,10,14,0.8)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="focus-ring text-sm font-semibold tracking-[0.3em] uppercase text-white">
          Yakub
        </Link>
        <nav className="flex items-center gap-6 text-sm text-muted">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="focus-ring transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="mailto:hello@yakub.dev"
          className="focus-ring rounded-full border border-[var(--border-soft)] px-4 py-2 text-xs uppercase tracking-[0.3em] text-white transition hover:border-[var(--accent)]"
        >
          Contact
        </Link>
      </div>
    </header>
  );
}
