/**
 * Replaces `{key}` tokens in a string with values from `tokens`.
 * Throws at build time if a token has no matching value, so a typo in
 * copy.ts fails the build instead of shipping "{foo}" to visitors.
 */
export function fill(template: string, tokens: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_match, key: string) => {
    if (!(key in tokens)) {
      throw new Error(`fill(): unknown token "{${key}}" in template: "${template}"`);
    }
    return String(tokens[key]);
  });
}
