import clsx from "clsx";

type TagProps = {
  label: string;
  className?: string;
};

export function Tag({ label, className }: TagProps) {
  return <span className={clsx("chip", className)}>{label}</span>;
}
