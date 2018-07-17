module.exports = {
  apps: [
    {
      name: 'myprofashional',
      script: './server.js',
      env: {
        NODE_ENV: 'stage',
        //NODE_CONFIG_DIR: '/var/www/myprofashional/config/',
      },
      env_production: {
        NODE_ENV: 'production',
        //NODE_CONFIG_DIR: '/var/www/myprofashional/config/',
      },
    },
  ],
};
