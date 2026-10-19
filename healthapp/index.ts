import express from 'express';
import calculateBmi from './bmiCalculator.ts';

const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});