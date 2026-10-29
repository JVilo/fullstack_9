import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, Container, Button } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import axios from 'axios';

import { Patient, Gender, Diagnosis, EntryWithoutId } from '../../types';
import patientService from '../../services/patients';
import diagnosisService from '../../services/diagnoses';
import EntryDetails from './EntryDetails';
import AddEntryModal from '../AddEntryModal';

const PatientDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const fetchedPatient = await patientService.getById(id);
        const fetchedDiagnoses = await diagnosisService.getAll();
        setPatient(fetchedPatient);
        setDiagnoses(fetchedDiagnoses);
      } catch (e) {
        console.error(e);
      }
    };
    void fetchData();
  }, [id]);

  if (!patient) {
    return <Typography>Loading...</Typography>;
  }

  const renderGenderIcon = (gender: Gender) => {
    switch (gender) {
      case Gender.Male:
        return <MaleIcon />;
      case Gender.Female:
        return <FemaleIcon />;
      default:
        return <TransgenderIcon />;
    }
  };

  const submitNewEntry = async (values: EntryWithoutId) => {
    try {
      const updatedPatient = await patientService.createEntry(patient.id, values);
      setPatient(updatedPatient);
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === 'string') {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          setError(message);
        } else {
          setError('Unrecognized axios error');
        }
      } else {
        setError('Unknown error');
      }
    }
  };

  return (
    <Container>
      <Box sx={{ marginTop: 2 }}>
        <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {patient.name} {renderGenderIcon(patient.gender)}
        </Typography>
        <Typography variant="body1">ssn: {patient.ssn}</Typography>
        <Typography variant="body1">occupation: {patient.occupation}</Typography>
        <Typography variant="body1">date of birth: {patient.dateOfBirth}</Typography>

        <Button variant="contained" onClick={() => openModal()} sx={{ mt: 2 }}>
          Add New Entry
        </Button>

        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          onClose={closeModal}
          diagnoses={diagnoses}
          error={error}
        />

        <Typography variant="h6" sx={{ marginTop: 2 }}>
          entries
        </Typography>
        {patient.entries.length === 0 ? (
          <Typography variant="body2">No entries</Typography>
        ) : (
          patient.entries.map((entry) => (
            <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
          ))
        )}
      </Box>
    </Container>
  );
};

export default PatientDetailPage;