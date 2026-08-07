/**
 * Emoji presets and fallbacks for expense categories
 */

export const DEFAULT_CATEGORY_EMOJI = "📦";

/** Preset options shown in the category form picker */
export const CATEGORY_EMOJI_PRESETS = [
  "🍔",
  "🚗",
  "🎬",
  "🛍️",
  "📄",
  "🏥",
  "📚",
  "✈️",
  "📦",
  "✨",
  "💡",
  "🏠",
  "☕",
  "🎮",
  "🎵",
] as const;

/** Legacy name→emoji map used only as a fallback when API emoji is missing */
export const CATEGORY_EMOJIS: Record<string, string> = {
  Food: "🍔",
  Transportation: "🚗",
  Entertainment: "🎬",
  Shopping: "🛍️",
  Bills: "📄",
  Healthcare: "🏥",
  Education: "📚",
  Travel: "✈️",
  Personal: "✨",
  Other: "📦",
};

export function getCategoryEmoji(
  categoryName: string,
  categories?: Array<{ name: string; emoji?: string | null }>,
): string {
  const fromApi = categories?.find((c) => c.name === categoryName)?.emoji;
  if (fromApi) {
    return fromApi;
  }

  return CATEGORY_EMOJIS[categoryName] || DEFAULT_CATEGORY_EMOJI;
}
