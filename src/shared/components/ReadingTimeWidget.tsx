import clsx from "clsx";

type ReadingTimeWidgetProps = {
  minutes: number;
  className?: string;
};

export function ReadingTimeWidget({ minutes, className }: ReadingTimeWidgetProps) {
  return <span className={clsx("chip text-xs uppercase tracking-[0.2em] text-amber-100", className)}>~ {minutes} min read</span>;
}
