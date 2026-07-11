const configuredSiteUrl = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL;

export const SITE_URL = (configuredSiteUrl || 'https://www.radusca.dev').replace(/\/$/, '');
