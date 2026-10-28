import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, Container } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

import { Patient, Gender, Diagnosis } from '../../types';
import patientService from '../../services/patients';
import diagnosisService from '../../services/diagnoses';
import EntryDetails from './EntryDetails';

const PatientDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

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

  return (
    <Container>
      <Box sx={{ marginTop: 2 }}>
        <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {patient.name} {renderGenderIcon(patient.gender)}
        </Typography>
        <Typography variant="body1">ssn: {patient.ssn}</Typography>
        <Typography variant="body1">occupation: {patient.occupation}</Typography>
        <Typography variant="body1">date of birth: {patient.dateOfBirth}</Typography>

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