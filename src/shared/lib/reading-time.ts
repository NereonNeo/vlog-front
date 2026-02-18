const WORDS_PER_MINUTE = 220;

export function getReadingTimeMinutes(text: string): number {
  const words = text
    .replace(/[#>*_`~\-]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}
