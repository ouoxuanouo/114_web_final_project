import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'express-async-errors';

import { connectMongo } from './db/mongo.js';
import { apiRouter } from './routes/index.js';
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.use('/api', apiRouter);

app.use(notFound);
app.use(errorHandler);

const port = Number(process.env.PORT || 3001);

await connectMongo(process.env.MONGODB_URI);

app.listen(port, () => {
  console.log(`✅ API server running on http://localhost:${port}`);
});
