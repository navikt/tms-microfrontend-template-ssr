const isProduction = window.location.href.includes('www.nav.no');
const isDevelopment = window.location.href.includes('www.ansatt.dev.nav.no');

export const getEnvironment = () => {
  if (isDevelopment) {
    return 'development';
  }
  if (isProduction) {
    return 'production';
  }
  return 'local';
};

type EnvUrl = { development: string; production: string; local: string };

const BASE_URL: EnvUrl = {
  local: 'http://localhost:3000',
  development: 'https://www.ansatt.dev.nav.no/tms-astro-template',
  production: 'https://www.nav.no/tms-astro-template',
};

export const baseUrl = BASE_URL[getEnvironment()];
