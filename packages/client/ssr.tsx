import type * as express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
// import { routes } from './src/app';
import { links } from './src/utils/const';
import { createStaticHandler } from '@remix-run/router';
import {
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server';
import { Home } from './src/pages/index';
import { homeProps } from './src/mocs/homeProps';
import { ProfilePage } from './src/pages/index';


/* const Home = () => {
  return <div>Главная</div>;
};

const Profile = () => {
  return <div>Профиль</div>;
};
 */
const routes = [
  { path: links.root.path, element: <Home {...homeProps}/> },
  { path: links.profile.path, element: <ProfilePage /> },
];

export const render = async (request: express.Request) => {
  const { query, dataRoutes } = createStaticHandler(routes);
  const remixRequest = createFetchRequest(request);
  const context = await query(remixRequest);

  if (context instanceof Response) {
    throw context;
  }

  const router = createStaticRouter(dataRoutes, context);

  return renderToString(
    <React.StrictMode>
      <StaticRouterProvider
        router={router}
        context={context}
        nonce="the-nonce"
      />
    </React.StrictMode>
  );
};

export const createFetchHeaders = (
  requestHeaders: express.Request['headers']
): Headers => {
  const headers = new Headers();

  Object.entries(requestHeaders).forEach(([key, values]) => {
    if (values) {
      if (Array.isArray(values)) {
        values.forEach(value => headers.append(key, value));
      } else {
        headers.set(key, values);
      }
    }
  });

  return headers;
};

export const createFetchRequest = (req: express.Request): Request => {
  const origin = `${req.protocol}://${req.get('host')}`;
  const url = new URL(req.originalUrl || req.url, origin);

  const controller = new AbortController();

  req.on('close', () => {
    controller.abort();
  });

  const init: RequestInit = {
    method: req.method,
    headers: createFetchHeaders(req.headers),
    signal: controller.signal,
  };

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = req.body;
  }

  return new Request(url.href, init);
};
