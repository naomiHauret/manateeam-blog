module.exports = {
  env: {
    NEXT_PUBLIC_PRISMIC_API_ACCESS_TOKEN: process.env.PRISMIC_API_ACCESS_TOKEN,
    NEXT_PUBLIC_PRISMIC_API_URL: process.env.NEXT_PUBLIC_PRISMIC_API_URL,
  },
  i18n: {
    locales: ['en-gb'],
    defaultLocale: 'en-gb',
  },
}
