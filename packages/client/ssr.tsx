import React from 'react';
import { renderToString } from 'react-dom/server';
import { routes } from './src/app';
import { createStaticHandler } from '@remix-run/router';
import {
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server';

export const render = async req => {
  const handler = createStaticHandler(routes);
  const routerContext = await handler.query(req);

  if (routerContext instanceof Response) {
    throw routerContext;
  }

  const router = createStaticRouter(routes, routerContext);

  return renderToString(
    <StaticRouterProvider router={router} context={routerContext} />
  );
};
