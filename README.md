# Table for compiling a cryptocurrency sale rating

## This is template without API. To complete the work you need to connect the API.

## login 'admin' pass '!Testpass'

## Dependencies

- Node 8.11.3
- Yarn 1.7.0
- Redis (store session)
- Docker

## Development

### Install and launch

```bash
yarn install
APP_PORT=3000 REDIS_HOST=localhost yarn start
```

## Production

### Install, build and launch

```bash
yarn install
yarn run build --release
cd ./build
yarn install
NODE_ENV=production [environment variables] node ./server.js
```

## Environment variables

```
APP_PORT                application port (default: 3000)
API_SERVER_URL          API internal url available on server side only (e.g.: http://internal.api)
API_CLIENT_URL          API public url available on client side (e.g.: http://api.example.com)
TRUST_PROXY             Express behind proxies (default: loopback), see also https://expressjs.com/en/guide/behind-proxies.html
REDIS_HOST              redis host (default: redis)
REDIS_PORT              redis port (default: 6379)
SESSION_SECRET          session secret (default: 3A8g65zHx9qW)
SESSION_NAME            session cookie name (default: sid)
ROUTES_PREFIX           routes prefix (default: '')
SEPARATE_LOGIN          separate page for login form (default: 0, 1 to enable)
DSN                     sentry DSN
```

## Important notes

- Always specify NODE_ENV in production
- ESLint config restrict import files like `**/config`. To allow import config put `/* eslint-disable-next-line no-restricted-imports */` in line before import.
