import express from 'express';
import cors from 'cors';
import { router as cardRouter } from './routes/cards';
import { router as battleRouter } from './routes/battles';

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  }),
);

app.use(express.json());

// Routes
app.use('/cards', cardRouter);
app.use('/battle', battleRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
