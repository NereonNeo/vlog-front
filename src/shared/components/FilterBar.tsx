import clsx from "clsx";

type FilterOption = {
  label: string;
  value: string;
};

type FilterBarProps = {
  searchValue: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  tags?: FilterOption[];
  activeTags?: string[];
  onToggleTag?: (tag: string) => void;
  sorts?: FilterOption[];
  activeSort?: string;
  onSortChange?: (value: string) => void;
  className?: string;
};

export function FilterBar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search",
  tags = [],
  activeTags = [],
  onToggleTag,
  sorts = [],
  activeSort,
  onSortChange,
  className,
}: FilterBarProps) {
  return (
    <div className={clsx("surface-muted p-5 md:p-6", className)}>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <label className="flex flex-1 flex-col gap-2 text-sm text-muted">
          Search
          <input
            className="focus-ring w-full rounded-[var(--radius-input)] border border-[var(--border-soft)] bg-[rgba(12,14,18,0.7)] px-4 py-2 text-sm text-white"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(event) => onSearchChange?.(event.target.value)}
          />
        </label>
        {sorts.length > 0 ? (
          <label className="flex w-full flex-col gap-2 text-sm text-muted md:w-64">
            Sort
            <select
              className="focus-ring w-full rounded-[var(--radius-input)] border border-[var(--border-soft)] bg-[rgba(12,14,18,0.7)] px-4 py-2 text-sm text-white"
              value={activeSort}
              onChange={(event) => onSortChange?.(event.target.value)}
            >
              {sorts.map((sort) => (
                <option key={sort.value} value={sort.value}>
                  {sort.label}
                </option>
              ))}
            </select>
          </label>
        ) : null}
      </div>
      {tags.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => {
            const isActive = activeTags.includes(tag.value);
            return (
              <button
                key={tag.value}
                type="button"
                onClick={() => onToggleTag?.(tag.value)}
                className={clsx("chip focus-ring transition", isActive && "border-[var(--accent)] text-white shadow-[0_0_12px_var(--accent-soft)]")}
              >
                {tag.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
