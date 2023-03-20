import type * as express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStaticHandler } from '@remix-run/router';
import {
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server';
import { routes } from './src/routes';
import { Provider } from 'react-redux';
import { store } from './src/reduxstore/monopolyStore';

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
      <Provider store={store}>
        <StaticRouterProvider
          router={router}
          context={context}
          nonce="the-nonce"
        />
      </Provider>
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
