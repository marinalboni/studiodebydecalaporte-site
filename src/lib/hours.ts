import type { DayHours, Weekday } from "../config/site";

/** schema.org expects "https://schema.org/Monday" style URLs for dayOfWeek. */
const SCHEMA_DAY: Record<Weekday, string> = {
  monday: "https://schema.org/Monday",
  tuesday: "https://schema.org/Tuesday",
  wednesday: "https://schema.org/Wednesday",
  thursday: "https://schema.org/Thursday",
  friday: "https://schema.org/Friday",
  saturday: "https://schema.org/Saturday",
  sunday: "https://schema.org/Sunday",
};

export interface OpeningHoursSpecification {
  "@type": "OpeningHoursSpecification";
  dayOfWeek: string;
  opens: string;
  closes: string;
}

/** One entry per open block (a day with a lunch break produces two entries), skipping closed days. */
export function buildOpeningHoursSpecification(days: DayHours[]): OpeningHoursSpecification[] {
  const specs: OpeningHoursSpecification[] = [];
  for (const day of days) {
    if (day.closed) continue;
    for (const block of day.blocks) {
      specs.push({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: SCHEMA_DAY[day.day],
        opens: block.opens,
        closes: block.closes,
      });
    }
  }
  return specs;
}

export interface DayDisplay {
  day: Weekday;
  label: string;
  closed: boolean;
  /** Human-readable hours, e.g. "09:00 – 18:00" or "09:00 – 12:00, 13:00 – 18:00". Empty when closed. */
  hoursText: string;
  /** Raw blocks, for rendering <time datetime="09:00"> per block. */
  blocks: { opens: string; closes: string }[];
}

/**
 * Builds a render-ready list of days. Day labels and the "closed" label are
 * passed in from copy.ts so this stays free of hard-coded Portuguese.
 */
export function buildHoursDisplay(
  days: DayHours[],
  dayLabels: Record<Weekday, string>,
  closedLabel: string,
): DayDisplay[] {
  return days.map((day) => ({
    day: day.day,
    label: dayLabels[day.day],
    closed: day.closed,
    hoursText: day.closed
      ? closedLabel
      : day.blocks.map((b) => `${b.opens} – ${b.closes}`).join(", "),
    blocks: day.closed ? [] : day.blocks,
  }));
}
