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
import { appReducer } from './src/reduxstore/monopolyStore';
import { links } from './src/utils/const';
import { configureStore } from '@reduxjs/toolkit';
import { getUser } from './src/reduxstore/user/userSlice';

export const render = async (request: express.Request) => {
  const { query, dataRoutes } = createStaticHandler(routes);
  const remixRequest = createFetchRequest(request);
  const context = await query(remixRequest);
  const store = configureStore({ reducer: appReducer });

  if (request.url === links.root.path) {
    await store.dispatch(
      getUser({
        Cookie:
          'authCookie=62f174773382a33c855e5ed6eccc3687d1b4080c:1679768924; uuid=22890feb-d011-4db4-99e8-a567b94a7517' ??
          '',
      })
    );
  }

  const preloadedState = store.getState();

  if (context instanceof Response) {
    throw context;
  }

  const router = createStaticRouter(dataRoutes, context);

  const html = renderToString(
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

  return [html, preloadedState];
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
