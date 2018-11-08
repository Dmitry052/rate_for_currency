/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

// TODO: logger
import path from 'path';
import axios from 'axios';
import express from 'express';
import session from 'express-session';
import sessionStore from 'connect-redis';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import React from 'react';
import ReactDOM from 'react-dom/server';
import PrettyError from 'pretty-error';

// import { PersistGate } from 'redux-persist/integration/react';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers';

import App from './components/App';
import Html from './components/Html';
import { ErrorPageWithoutStyle } from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.scss';
import router from './router';
import routes from './routes';
// import assets from './asset-manifest.json'; // eslint-disable-line import/no-unresolved
import chunks from './chunk-manifest.json'; // eslint-disable-line import/no-unresolved
import configureStore from './store/configureStore';
import { setRuntimeVariable } from './actions/runtime';
/* eslint-disable-next-line no-restricted-imports */
import commonConfig from './config';

const ENVIRONMENT = process.env.NODE_ENV;
const { [ENVIRONMENT]: appConfig } = commonConfig;

//
// Global variables
// -----------------------------------------------------------------------------
const APP_PORT = parseInt(process.env.APP_PORT, 10) || appConfig.appPort;
const TRUST_PROXY = process.env.TRUST_PROXY || appConfig.trustProxy;
const API_CLIENT_URL = process.env.API_CLIENT_URL || appConfig.api.clientUrl;
const API_SERVER_URL = process.env.API_SERVER_URL || appConfig.api.serverUrl;
const REDIS_HOST = process.env.REDIS_HOST || appConfig.redis.host;
const REDIS_PORT = parseInt(process.env.REDIS_PORT, 10) || appConfig.redis.port;
const SESSION_SECRET = process.env.SESSION_SECRET || appConfig.session.secret;
const SESSION_NAME = process.env.SESSION_NAME || appConfig.session.name;

//
// Routing prefix init
// -----------------------------------------------------------------------------
const ROUTES_PREFIX = process.env.ROUTES_PREFIX || appConfig.routesPrefix;
const ROUTES_PREFIX_STRING = ROUTES_PREFIX ? `/${ROUTES_PREFIX}` : '';

//
// Separate login page init
// -----------------------------------------------------------------------------
const SEPARATE_LOGIN = process.env.SEPARATE_LOGIN
  ? parseInt(process.env.SEPARATE_LOGIN, 10) === 1
  : appConfig.separateLogin;
const LOGIN_PATH = SEPARATE_LOGIN ? '/auth/login' : '/';

//
// Set axios defaults
// -----------------------------------------------------------------------------
// TODO: check
axios.defaults.baseURL = `http://localhost:${APP_PORT}`;

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
  // send entire app down. Process manager will restart it
  process.exit(1);
});

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

const app = express();

//
// If you are using proxy from external machine, you can set TRUST_PROXY env
// Default is to trust proxy headers only from loopback interface.
// -----------------------------------------------------------------------------
app.set('trust proxy', TRUST_PROXY);

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//
// Register session middleware
// -----------------------------------------------------------------------------
const SessionStore = sessionStore(session);
app.use(
  session({
    name: SESSION_NAME,
    store: new SessionStore({
      host: REDIS_HOST,
      port: REDIS_PORT,
    }),
    secret: SESSION_SECRET,
    resave: false,
    cookie: {
      httpOnly: false,
      maxAge: null,
    },
    saveUninitialized: false,
  }),
);

// Crome favicon request fix
app.get('/favicon.ico', (req, res) => {
  res.sendStatus(204);
});

//
// Check path prefix
// -----------------------------------------------------------------------------
app.use((req, res, next) => {
  if (ROUTES_PREFIX_STRING && !req.originalUrl.startsWith(ROUTES_PREFIX_STRING)) {
    return res.end();
  }
  return next();
});

// Register server-side rendering middleware
app.use(`${ROUTES_PREFIX_STRING}/auth`, require('./server/routes/auth')({ API_SERVER_URL }));

// Register middleware to check authenticated user
// -----------------------------------------------------------------------------
app.use((req, res, next) => {
  const guest = req.session == null || req.session.user == null;

  if (guest && req.method === 'GET' && req.path !== `${ROUTES_PREFIX_STRING}${LOGIN_PATH}`) {
    return res.redirect(`${ROUTES_PREFIX_STRING}${LOGIN_PATH}`);
  }

  if (req.path === '/' && typeof req.session.user !== 'undefined') {
    return res.redirect(`${ROUTES_PREFIX_STRING}/exchanger`);
  }

  return next();
});

//
// -----------------------------------------------------------------------------
app.get(ROUTES_PREFIX_STRING ? `${ROUTES_PREFIX_STRING}/*` : '*', async (req, res, next) => {
  try {
    const css = new Set();

    // Enables critical path CSS rendering
    // https://github.com/kriasoft/isomorphic-style-loader
    const insertCss = (...styles) => {
      // eslint-disable-next-line no-underscore-dangle
      styles.forEach(style => css.add(style._getCss()));
    };

    // ******** For API Request *******
    // if the request came from the address bar
    // const { query, params } = req;
    // const sheet = params[0].split('/').slice(-1)[0];

    // let newInitialState = {};

    // if (req.session.user) {
    //   newInitialState = createInitial(req.session.user.sheets);
    // }

    // if (
    //   query != null &&
    //   sheet != null &&
    //   req.session != null &&
    //   req.session.user != null &&
    //   req.session.user.uuid != null
    // ) {
    //   const { uuid } = req.session.user;
    //   const axiosConfig = {
    //     url: `${API_SERVER_URL}/api/${sheet}`,
    //     method: 'post',
    //     data: { ...query, uuid },
    //     headers: {
    //       'Content-type': 'application/json',
    //     },
    //   };

    //   try {
    //     const result = await axios(axiosConfig);
    //     console.info(result.data);
    //   } catch (err) {
    //     console.error(err);
    //   }
    // }
    // ******************************

    const initialState = {
      user: req.session.user || null,
    };

    const persistConfig = {
      key: 'root',
      storage,
    };

    const persistedReducer = persistReducer(persistConfig, rootReducer);

    const store = configureStore(initialState, persistedReducer, {
      // middleware
    });
    const persistor = persistStore(store);

    store.dispatch(
      setRuntimeVariable({
        name: 'initialNow',
        value: Date.now(),
      }),
    );

    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = {
      insertCss,
      // The twins below are wild, be careful!
      pathname: req.path,
      routesPrefix: ROUTES_PREFIX_STRING,
      loginPath: LOGIN_PATH,
      query: req.query,
      // You can access redux through react-redux connect
      store,

      storeSubscription: null,
    };

    const { children: routesChildren, ...otherRoutesElements } = routes;
    const authRoute = routesChildren.find(child => child.role === 'authentication');
    const otherRoutes = routesChildren.filter(child => child.role !== 'authentication');

    const route = await router({
      ...otherRoutesElements,
      ...{
        path: ROUTES_PREFIX_STRING,
        children: [
          {
            ...authRoute,
            path: LOGIN_PATH,
          },
          ...otherRoutes,
        ],
      },
    }).resolve(context);

    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect);
      return;
    }

    const data = { ...route };
    data.children = ReactDOM.renderToString(<App context={context}>{route.component}</App>);
    data.styles = [{ id: 'css', cssText: [...css].join('') }];

    const scripts = new Set();
    const addChunk = chunk => {
      if (chunks[chunk]) {
        chunks[chunk].forEach(asset => scripts.add(asset));
      } else if (__DEV__) {
        throw new Error(`Chunk with name '${chunk}' cannot be found`);
      }
    };
    addChunk('client');
    if (route.chunk) addChunk(route.chunk);
    if (route.chunks) route.chunks.forEach(addChunk);

    data.scripts = Array.from(scripts);
    data.app = {
      routesPrefix: ROUTES_PREFIX_STRING,
      loginPath: LOGIN_PATH,
      apiUrl: API_CLIENT_URL,
      persistor,
      state: context.store.getState(),
    };

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    res.status(route.status || 200);
    res.send(`<!doctype html>${html}`);
  } catch (err) {
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(pe.render(err));
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      styles={[{ id: 'css', cssText: errorPageStyle._getCss() }]} // eslint-disable-line no-underscore-dangle
    >
      {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
    </Html>,
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
if (!module.hot) {
  app.listen(APP_PORT, () => {
    console.info(`The server is running at http://localhost:${APP_PORT}/`);
  });
}

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
  app.hot = module.hot;
  module.hot.accept('./router');
}

export default app;
