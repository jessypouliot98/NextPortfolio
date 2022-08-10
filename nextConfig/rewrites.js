const routes = require('./routes');

module.exports = function () {
  const localeRewrites = routes.reduce((rewrites, { destination, variants }) => {
    Object.values(variants).forEach((variant) => {
      rewrites.push({
        destination,
        source: variant
      });
    });

    return rewrites;
  }, []);

  return {
    fallback: [...localeRewrites]
  };
};