import { BlogProperties } from 'src/types/notion';
import slugify from 'slugify';

export function getSlug(string: string) {
  return slugify(string.trim().toLowerCase());
}

export function getSlugFromProperties(properties: BlogProperties) {
  return properties.pathoverride ? getSlug(properties.pathoverride) : getSlug(properties.title);
}
