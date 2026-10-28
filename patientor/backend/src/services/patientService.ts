import patientData from '../data/patients.ts';
import type { Patient, NonSensitivePatient, NewPatient } from '../types.ts';
import { v1 as uuid } from 'uuid';

const patients: Patient[] = patientData as Patient[];

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  if (!patient) {
    return undefined;
  }
  return {
    ...patient,
    entries: patient.entries ?? []
  };
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatientId = uuid();
  const newPatient: Patient = {
    ...patient,
    id: newPatientId,
    entries: [],
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getPatientById,
  addPatient
};