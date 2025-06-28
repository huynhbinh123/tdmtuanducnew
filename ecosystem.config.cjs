module.exports = {
    apps: [
      {
        name: 'vinawebapp',
        exec_mode: 'fork',
        instances: 1,
        script: '.output/server/index.mjs',
        env: {
          "PORT": 3610,
          "NODE_ENV": "development"
        },
        env_production: {
          "PORT": 3610,
          "NODE_ENV": "production",
        }
      }
    ]
  }