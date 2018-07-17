module.exports = {
  apps: [
    {
      name: 'myprofashional',
      script: './server.js',
      cwd: '/var/www/myprofashional/',
      instance_var: 'INSTANCE_ID',
      env: {
        PORT: 80,
        NODE_ENV: 'stage',
        NODE_CONFIG_DIR: '/var/www/myprofashional/config/',
      },
      env_production: {
        PORT: 80,
        NODE_ENV: 'production',
        NODE_CONFIG_DIR: '/var/www/myprofashional/config/',
      },
    },
  ],
};
