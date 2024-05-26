import express from 'express';
import router from './routes/cards';

const app = express();

app.use(express.json());

// Routes
app.use('/cards', router);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
