import slugify from 'slugify';

import type { BlogProperties } from 'src/types/notion';

export function getSlug(string: string) {
  return slugify(string.trim().toLowerCase(), {
    remove: /[*+~.()'"!:@,?]/g,
  });
}

export function getSlugFromProperties(properties: BlogProperties) {
  return properties.pathoverride ? getSlug(properties.pathoverride) : getSlug(properties.title);
}
