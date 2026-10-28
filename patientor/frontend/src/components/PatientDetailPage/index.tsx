import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, Container } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

import { Patient, Gender } from '../../types';
import patientService from '../../services/patients';

const PatientDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) return;
      try {
        const fetchedPatient = await patientService.getById(id);
        setPatient(fetchedPatient);
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatient();
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
            <Box key={entry.id} sx={{ border: '1px solid #ccc', padding: 2, marginY: 1, borderRadius: 1 }}>
              <Typography variant="body1">
                <strong>{entry.date}</strong> {entry.description}
              </Typography>
              {entry.diagnosisCodes && (
                <ul>
                  {entry.diagnosisCodes.map((code) => (
                    <li key={code}>{code}</li>
                  ))}
                </ul>
              )}
            </Box>
          ))
        )}
      </Box>
    </Container>
  );
};

export default PatientDetailPage;