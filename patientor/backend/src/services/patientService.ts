import patientData from '../data/patients.ts';
import type { NonSensitivePatient, Patient, NewPatient } from '../types.ts';
import { v1 as uuid } from 'uuid';

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

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
    entries: patient.entries || [],
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getNonSensitivePatients,
  addPatient,
};