import express from 'express';
import patientService from '../services/patientService.ts';
import { newPatientParser } from '../middleware.ts';
import type { NewPatient } from '../types.ts';
import { newEntrySchema } from '../types.ts';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
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

router.post('/:id/entries', (req, res) => {
  try {
    // Removed the unnecessary `as NewEntry` assertion here
    const parsedEntry = newEntrySchema.parse(req.body);
    const updatedPatient = patientService.addEntry(req.params.id, parsedEntry);

    if (updatedPatient) {
      res.json(updatedPatient);
    } else {
      res.status(404).send({ error: 'Patient not found' });
    }
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send({ error: errorMessage });
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const parsedEntry = newEntrySchema.parse(req.body);
    const updatedPatient = patientService.addEntry(req.params.id, parsedEntry);

    if (updatedPatient) {
      res.json(updatedPatient);
    } else {
      res.status(404).send({ error: 'Patient not found' });
    }
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send({ error: errorMessage });
  }
});

export default router;