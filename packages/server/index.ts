import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import type { ViteDevServer } from 'vite';
import { createProxyMiddleware } from 'http-proxy-middleware';
import express from 'express';
import { createClientAndConnect } from './db';
import { router } from './src/router/forumRouter';

dotenv.config();

const isDev = process.env.NODE_ENV === 'development';

async function startServer() {
  const app = express();
  app.use(cors());
  const port = Number(process.env.SERVER_PORT) || 3000;

  createClientAndConnect();

  let vite: ViteDevServer;
  const distPath = !isDev
    ? path.dirname(require.resolve('client/dist/index.html'))
    : '';
  const ssrClientPath = !isDev
    ? require.resolve('client/dist-ssr/client.cjs')
    : '';
  const srcPath = path.dirname(require.resolve('client'));

  if (isDev) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    });

    app.use(vite.middlewares);
  }

  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)');
  });

  if (!isDev) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')));
    app.use('/images', express.static(path.resolve(distPath, 'images')));
  }

  app.use('/api/forum', express.json());
  app.use(router);

  app.use(
    '/api/v2',
    createProxyMiddleware({
      changeOrigin: true,
      cookieDomainRewrite: {
        '*': '',
      },
      target: 'https://ya-praktikum.tech',
    })
  );

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let template: string;

      if (!isDev) {
        template = fs.readFileSync(
          path.resolve(distPath, 'index.html'),
          'utf-8'
        );
      } else {
        template = fs.readFileSync(
          path.resolve(srcPath, 'index.html'),
          'utf-8'
        );

        template = await vite.transformIndexHtml(url, template);
      }

      let render: (...args: any) => Promise<[string, Record<string, any>]>;

      if (!isDev) {
        render = (await import(ssrClientPath)).render;
      } else {
        render = (await vite.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx')))
          .render;
      }

      try {
        const [appHtml, initialState] = await render(req);

        const serializedInitialState = `<script>window.initialState = ${JSON.stringify(
          initialState
        ).replace(/</g, '\\u003c')}</script>`;

        const html = template
          .replace('<!--ssr-outlet-->', appHtml)
          .replace('<!--store-data-->', serializedInitialState);

        res.setHeader('Content-Type', 'text/html');
        res.status(200).end(html);
      } catch (e) {
        if (e instanceof Response && e.status >= 300 && e.status <= 399) {
          return res.redirect(e.status, e.headers.get('Location') as string);
        }
        throw e;
      }
      next();
    } catch (error) {
      if (isDev) {
        vite.ssrFixStacktrace(error as Error);
      }
      next(error);
    }
  });

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
  });
}

startServer();
