import clsx from "clsx";

type BadgeVariant = "active" | "maintained" | "archived";

type BadgeProps = {
  label: string;
  variant?: BadgeVariant;
  className?: string;
};

const variantStyles: Record<BadgeVariant, string> = {
  active: "border-emerald-500/30 text-emerald-200 bg-emerald-500/10",
  maintained: "border-amber-500/30 text-amber-200 bg-amber-500/10",
  archived: "border-zinc-500/30 text-zinc-300 bg-zinc-500/10",
};

export function Badge({ label, variant = "active", className }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]",
        variantStyles[variant],
        className,
      )}
    >
      {label}
    </span>
  );
}
