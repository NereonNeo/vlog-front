import Link from "next/link";
import clsx from "clsx";

type Breadcrumb = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: Breadcrumb[];
  className?: string;
};

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={clsx("text-sm text-muted", className)}>
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link href={item.href} className="focus-ring transition hover:text-white">
                  {item.label}
                </Link>
              ) : (
                <span className="text-soft">{item.label}</span>
              )}
              {!isLast ? <span className="text-soft">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
