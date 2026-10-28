import express from 'express';
import patientService from '../services/patientService.ts';
import { newPatientParser } from '../middleware.ts';
import type { NewPatient } from '../types.ts';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients()); // or getNonSensitivePatients depending on what your service exports
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatientById(req.params.id);

  if (patient) {
    res.json(patient);
  } else {
    res.status(404).send({ error: 'Patient not found' });
  }
});

router.post('/', newPatientParser, (req, res) => {
  const addedPatient = patientService.addPatient(req.body as NewPatient);
  res.json(addedPatient);
});

export default router;