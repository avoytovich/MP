const withSass = require('@zeit/next-sass');
module.exports = withSass({
  webpack: function(cfg) {
    const originalEntry = cfg.entry;
    cfg.entry = async () => {
      const entries = await originalEntry();

      if (entries['main.js']) {
        entries['main.js'].unshift('./client/polyfills.js');
      }

      return entries;
    };

    return cfg;
  },
});
