import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import express from 'express';
import { createClientAndConnect } from './db';
import { router } from './src/router/forumRouter';

const app = express();
app.use(cors());
const port = Number(process.env.SERVER_PORT) || 3001;
createClientAndConnect();
app.use(router);

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
});
