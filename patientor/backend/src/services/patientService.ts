import patientData from '../data/patients.ts';
import type { NonSensitivePatient, Patient } from '../types.ts';

const patients: Patient[] = patientData as Patient[];

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getNonSensitivePatients,
};