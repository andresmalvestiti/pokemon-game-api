// src/app.ts
import express from 'express';
import { PrismaClient } from '@prisma/client';
import router from './routes/users';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// Rutas
app.use('/users', router);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
