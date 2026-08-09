import { SITE_CONFIG } from '@/config/siteConfig';

export interface SocialLink {
  name: string;
  url: string;
  handle: string;
}

export const SOCIAL_LINKS = SITE_CONFIG.socials;
