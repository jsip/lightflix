module.exports = {
  reactStrictMode: false,
  env: {
    TMDB_API_KEY: process.env.NEXT_PUBLIC_TMDB_API_KEY,
  },
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
  },
};
