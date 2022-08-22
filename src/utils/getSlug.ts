import slugify from 'slugify';

export default function getSlug(string: string) {
  return slugify(string.trim().toLowerCase());
}
