module.exports = [
  {
    destination: '/',
    variants: {
      en: '/',
      fr: '/'
    }
  },
  {
    destination: '/projects/:path*',
    variants: {
      en: '/projects/:path*',
      fr: '/projets/:path*'
    }
  },
];