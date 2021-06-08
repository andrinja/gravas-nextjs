const NextI18Next = require("next-i18next").default;
const { localeSubpaths } = require('next/config').default().publicRuntimeConfig
const path = require('path')


module.exports = new NextI18Next({
  defaultLanguage: "lv",
  otherLanguages: ["ru", "en"],
  localeSubpaths,
  localePath: path.resolve('./static/locales'),
  detection: {
    lookupCookie: "next-i18next",
    order: ["cookie", "querystring", "localStorage", "path", "subdomain"],
    caches: ["cookie"]
  }
});
