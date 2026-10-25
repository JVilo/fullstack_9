import express from 'express';
import patientService from '../services/patientService.ts';
import { newPatientParser } from '../middleware.ts';
import type { NewPatient } from '../types.ts';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post('/', newPatientParser, (req, res) => {
  const addedPatient = patientService.addPatient(req.body as NewPatient);
  res.json(addedPatient);
});

export default router;