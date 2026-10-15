export interface TextSegment {
  text: string;
  bold: boolean;
}

/**
 * Parses a small, safe subset of markdown from copy strings: blank-line
 * separated paragraphs and **bold** spans. Returns structured segments
 * (never raw HTML) so callers render them with normal JSX/Astro templating
 * instead of set:html, avoiding any markup-injection risk.
 */
export function parseRichText(input: string): TextSegment[][] {
  return input
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => {
      const segments: TextSegment[] = [];
      const boldPattern = /\*\*(.+?)\*\*/g;
      let lastIndex = 0;
      let match: RegExpExecArray | null;

      while ((match = boldPattern.exec(paragraph))) {
        if (match.index > lastIndex) {
          segments.push({ text: paragraph.slice(lastIndex, match.index), bold: false });
        }
        segments.push({ text: match[1], bold: true });
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < paragraph.length) {
        segments.push({ text: paragraph.slice(lastIndex), bold: false });
      }
      return segments;
    });
}
