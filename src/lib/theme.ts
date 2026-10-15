// Reads color values straight out of src/styles/tokens.css at build time, so
// <meta name="theme-color"> and the web app manifest can never drift from the
// CSS theme. tokens.css stays the single place a color is defined.
import tokensCss from "../styles/tokens.css?raw";

const declarations = tokensCss.replace(/\/\*[\s\S]*?\*\//g, "");

/** Returns the value of a custom property declared in tokens.css. Fails the build if it's missing. */
function readToken(name: string): string {
  const match = declarations.match(new RegExp(`--${name}\\s*:\\s*([^;]+);`));
  const value = match?.[1]?.trim();
  if (!value) {
    throw new Error(`[theme] --${name} is not declared in src/styles/tokens.css`);
  }
  return value;
}

export const themeColor = readToken("color-primary");
export const backgroundColor = readToken("color-bg");
