import React from 'react';
import { Box, Typography } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { Entry, Diagnosis, HealthCheckRating } from '../../types';

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<Props> = ({ entry, diagnoses }) => {
  const getDiagnosisName = (code: string): string => {
    const diagnosis = diagnoses.find(d => d.code === code);
    return diagnosis ? diagnosis.name : '';
  };

  const renderHealthRatingIcon = (rating: HealthCheckRating) => {
    switch (rating) {
      case HealthCheckRating.Healthy:
        return <FavoriteIcon sx={{ color: 'green' }} />;
      case HealthCheckRating.LowRisk:
        return <FavoriteIcon sx={{ color: 'yellow' }} />;
      case HealthCheckRating.HighRisk:
        return <FavoriteIcon sx={{ color: 'orange' }} />;
      case HealthCheckRating.CriticalRisk:
        return <FavoriteIcon sx={{ color: 'red' }} />;
      default:
        return null;
    }
  };

  switch (entry.type) {
    case "Hospital":
      return (
        <Box sx={{ border: '1px solid #ccc', padding: 2, marginY: 1, borderRadius: 1 }}>
          <Typography variant="body1">
            <strong>{entry.date}</strong> <LocalHospitalIcon />
          </Typography>
          <Typography variant="body2" sx={{ fontStyle: 'italic', marginY: 1 }}>
            {entry.description}
          </Typography>
          <Typography variant="body2">
            Discharge: {entry.discharge.date} - {entry.discharge.criteria}
          </Typography>
          <Typography variant="body2">diagnose by {entry.specialist}</Typography>
          {entry.diagnosisCodes && (
            <ul>
              {entry.diagnosisCodes.map((code) => (
                <li key={code}>
                  {code} {getDiagnosisName(code)}
                </li>
              ))}
            </ul>
          )}
        </Box>
      );
    case "OccupationalHealthcare":
      return (
        <Box sx={{ border: '1px solid #ccc', padding: 2, marginY: 1, borderRadius: 1 }}>
          <Typography variant="body1">
            <strong>{entry.date}</strong> <WorkIcon /> {entry.employerName}
          </Typography>
          <Typography variant="body2" sx={{ fontStyle: 'italic', marginY: 1 }}>
            {entry.description}
          </Typography>
          {entry.sickLeave && (
            <Typography variant="body2">
              Sick leave: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
            </Typography>
          )}
          <Typography variant="body2">diagnose by {entry.specialist}</Typography>
          {entry.diagnosisCodes && (
            <ul>
              {entry.diagnosisCodes.map((code) => (
                <li key={code}>
                  {code} {getDiagnosisName(code)}
                </li>
              ))}
            </ul>
          )}
        </Box>
      );
    case "HealthCheck":
      return (
        <Box sx={{ border: '1px solid #ccc', padding: 2, marginY: 1, borderRadius: 1 }}>
          <Typography variant="body1">
            <strong>{entry.date}</strong> <MedicalServicesIcon />
          </Typography>
          <Typography variant="body2" sx={{ fontStyle: 'italic', marginY: 1 }}>
            {entry.description}
          </Typography>
          <Box sx={{ marginY: 1 }}>{renderHealthRatingIcon(entry.healthCheckRating)}</Box>
          <Typography variant="body2">diagnose by {entry.specialist}</Typography>
          {entry.diagnosisCodes && (
            <ul>
              {entry.diagnosisCodes.map((code) => (
                <li key={code}>
                  {code} {getDiagnosisName(code)}
                </li>
              ))}
            </ul>
          )}
        </Box>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;