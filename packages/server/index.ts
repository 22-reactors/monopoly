import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
dotenv.config();

import express from 'express';
// import { createClientAndConnect } from './db';

async function startServer() {
  const app = express();
  app.use(cors());
  const port = Number(process.env.SERVER_PORT) || 3001;

  // createClientAndConnect();

  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)');
  });

  const distPath = path.dirname(require.resolve('client/dist/index.html'));
  const ssrClientPath = require.resolve('client/ssr-dist/client.cjs');

  app.use(express.static(distPath));

  app.use('*', async (_, res, next) => {
    try {
      const template = fs.readFileSync(
        path.resolve(distPath, 'index.html'),
        'utf-8'
      );

      const { render } = await import(ssrClientPath);

      const appHtml = await render();

      const html = template.replace(`<!--ssr-outlet-->`, appHtml);

      res.status(200).set({ 'Context-Type': 'text/html' }).end(html);
    } catch (error) {
      next(error);
    }
  });

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
  });
}

startServer();
