module.exports = [
  {
    alias: 'home',
    destination: '/',
    variants: {
      en: '/',
      fr: '/'
    }
  },
  {
    alias: 'project-list',
    destination: '/projects',
    variants: {
      en: '/projects',
      fr: '/projets'
    }
  },
  {
    alias: 'project-single',
    destination: '/projects/:slug',
    variants: {
      en: '/projects/:slug',
      fr: '/projets/:slug'
    }
  }
];