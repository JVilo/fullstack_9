interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArguments = (args: string[]): { dailyExercises: number[]; target: number } => {
  if (args.length < 4) {
    throw new Error("Not enough arguments. Please provide a target and at least one daily exercise value.");
  }

  const target = Number(args[2]);
  if (isNaN(target)) {
    throw new Error("Provided target was not a number!");
  }

  const exerciseArgs = args.slice(3);
  const dailyExercises: number[] = [];

  for (const arg of exerciseArgs) {
    const hours = Number(arg);
    if (isNaN(hours)) {
      throw new Error("Provided exercise values must be numbers!");
    }
    dailyExercises.push(hours);
  }

  return { dailyExercises, target };
};

const calculateExercises = (dailyExercises: number[], target: number): Result => {
  const periodLength = dailyExercises.length;
  const trainingDays = dailyExercises.filter(day => day > 0).length;
  const average = dailyExercises.reduce((sum, day) => sum + day, 0) / periodLength;
  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = "great job, target reached";
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "you need to work harder";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

try {
  const { dailyExercises, target } = parseArguments(process.argv);
  console.log(calculateExercises(dailyExercises, target));
} catch (error: unknown) {
  let errorMessage = "Something went wrong.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

export default calculateExercises;