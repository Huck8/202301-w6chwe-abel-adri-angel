import cors from 'cors';
import express from 'express';
import apiRouter from './api/api-router.js';
import authRouter from './api/auth/auth-router.js';

const app = express();
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS',
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

app.get('/', (req, res) => {
  res.json({ hello: 'World' });
});
app.use(express.json());
app.use('/auth', authRouter);
app.use('/api/v1', apiRouter);

export default app;
