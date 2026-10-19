import express from 'express';
import calculateBmi from './bmiCalculator.ts';
import calculateExercises from './exerciseCalculator.ts';

const app = express();

app.use(express.json());

app.get('/hello', (_req, _res) => {
  _res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const heightStr = req.query.height;
  const weightStr = req.query.weight;

  if (!heightStr || !weightStr || isNaN(Number(heightStr)) || isNaN(Number(weightStr))) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const height = Number(heightStr);
  const weight = Number(weightStr);

  try {
    const bmiResult = calculateBmi(height, weight);
    return res.json({
      weight,
      height,
      bmi: bmiResult
    });
  } catch {
    return res.status(400).json({ error: "malformatted parameters" });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body as { daily_exercises: any; target: any };

  if (!daily_exercises || target === undefined) {
    return res.status(400).json({ error: "parameters missing" });
  }

  if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const parsedDailyExercises = daily_exercises.map((d: unknown) => Number(d));
  const parsedTarget = Number(target);

  if (parsedDailyExercises.some(isNaN)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  try {
    const result = calculateExercises(parsedDailyExercises, parsedTarget);
    return res.json(result);
  } catch {
    return res.status(400).json({ error: "malformatted parameters" });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});