module.exports = [
  {
    alias: 'home',
    destination: '/:lang',
    variants: {
      en: '/:lang',
      fr: '/:lang'
    }
  },
  {
    alias: 'project-list',
    destination: '/:lang/projects',
    variants: {
      en: '/:lang/projects',
      fr: '/:lang/projets'
    }
  },
  {
    alias: 'project-single',
    destination: '/:lang/projects/:slug',
    variants: {
      en: '/:lang/projects/:slug',
      fr: '/:lang/projets/:slug'
    }
  }
];