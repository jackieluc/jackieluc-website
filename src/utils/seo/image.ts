import { SITE_IMAGE, SITE_IMAGE_ALT } from '@/config/constants';

import type { BlogProperties } from 'src/types/notion';

export default function getSeoImage(prop: BlogProperties): { seoimage: string; seoimagealt: string } {
  let seoimage = prop.seoimage;
  let seoimagealt = prop.seoimagealt;

  // apply default image and alt
  if (!seoimage || !seoimagealt) {
    seoimage = SITE_IMAGE;
    seoimagealt = SITE_IMAGE_ALT;
  }

  return {
    seoimage,
    seoimagealt,
  };
}
