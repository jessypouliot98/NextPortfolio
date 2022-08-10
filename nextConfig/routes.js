module.exports = [
  {
    destination: '/:lang',
    variants: {
      en: '/:lang',
      fr: '/:lang'
    }
  },
  {
    destination: '/:lang/projects',
    variants: {
      en: '/:lang/projects',
      fr: '/:lang/projets'
    }
  },
  {
    destination: '/:lang/projects/:slug',
    variants: {
      en: '/:lang/projects/:slug',
      fr: '/:lang/projets/:slug'
    }
  }
];