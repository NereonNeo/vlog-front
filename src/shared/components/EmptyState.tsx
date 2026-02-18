import type { ReactNode } from "react";
import clsx from "clsx";

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export function EmptyState({ title, description, action, className }: EmptyStateProps) {
  return (
    <div className={clsx("surface-muted p-8 text-center", className)}>
      <h3 className="text-lg font-semibold">{title}</h3>
      {description ? <p className="mt-2 text-sm text-muted">{description}</p> : null}
      {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
    </div>
  );
}
