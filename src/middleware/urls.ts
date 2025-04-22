import { getEnvironment } from '@src/utils/server/urls.ts';

const REDIRECT_URI = {
  local: 'http://localhost:4321/tms-astro-template',
  development: 'https://www.ansatt.dev.nav.no/tms-astro-template',
  production: 'https://www.nav.no/minside/tms-astro-template',
};

export const redirectUri = REDIRECT_URI[getEnvironment()];
export const loginUrl = `/tms-astro-template/oauth2/login?redirect=${redirectUri}`;
