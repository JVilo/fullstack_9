import type { NewPatient } from './types.ts';
import { newPatientSchema } from './types.ts';

const toNewPatient = (object: unknown): NewPatient => {
  return newPatientSchema.parse(object);
};

export default toNewPatient;