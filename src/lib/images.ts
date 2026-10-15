import type { ImageMetadata } from "astro";

export type EagerImageGlob = Record<string, { default: ImageMetadata }>;

/** Finds the glob-imported image whose path ends with the configured filename. */
export function resolveImage(glob: EagerImageGlob, filename: string): ImageMetadata | undefined {
  const entry = Object.entries(glob).find(([path]) => path.endsWith(`/${filename}`));
  return entry?.[1].default;
}
