import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnoses.ts';
import patientsRouter from './routes/patients.ts';
import { errorMiddleware } from './middleware.ts';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});