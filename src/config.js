module.exports = {
  development: {
    // Node.js app
    appPort: 3000,

    // Routes prefix
    routesPrefix: '',

    // Separate login page
    separateLogin: false,

    // https://expressjs.com/en/guide/behind-proxies.html
    trustProxy: 'loopback',

    // API Gateway
    api: {
      // API URL to be used in the client-side code
      clientUrl: '',
      // API URL to be used in the server-side code
      serverUrl: '',
    },

    // Session store
    redis: {
      host: 'redis',
      port: 6379,
    },

    // Session params
    session: {
      secret: '3A8g65zHx9qW',
      name: 'sid',
    },
  },
  test: {
    // Node.js app
    appPort: 5000,

    // Routes prefix
    routesPrefix: '',

    // Separate login page
    separateLogin: false,

    // https://expressjs.com/en/guide/behind-proxies.html
    trustProxy: 'loopback',

    // API Gateway
    api: {
      // API URL to be used in the client-side code
      clientUrl: '',
      // API URL to be used in the server-side code
      serverUrl: '',
    },

    // Session store
    redis: {
      host: 'redis',
      port: 6379,
    },

    // Session params
    session: {
      secret: '3A8g65zHx9qW',
      name: 'sid',
    },
  },
  production: {
    // Node.js app
    appPort: 7000,

    // Routes prefix
    routesPrefix: '',

    // Separate login page
    separateLogin: false,

    // https://expressjs.com/en/guide/behind-proxies.html
    trustProxy: 'loopback',

    // API Gateway
    api: {
      // API URL to be used in the client-side code
      clientUrl: '',
      // API URL to be used in the server-side code
      serverUrl: '',
    },

    // Session store
    redis: {
      host: 'redis',
      port: 6379,
    },

    // Session params
    session: {
      secret: '3A8g65zHx9qW',
      name: 'sid',
    },
  },
};
