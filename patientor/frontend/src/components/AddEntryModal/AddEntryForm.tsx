import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  FormHelperText,
  OutlinedInput,
  Chip
} from '@mui/material';
import { EntryWithoutId, HealthCheckRating, Diagnosis } from '../../types';

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
  onCancel: () => void;
  diagnoses: Diagnosis[];
  error?: string;
}

type EntryType = 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare';

const AddEntryForm = ({ onSubmit, onCancel, diagnoses, error }: Props) => {
  const [type, setType] = useState<EntryType>('HealthCheck');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  // HealthCheck specific
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);

  // Hospital specific
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  // Occupational specific
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStart, setSickLeaveStart] = useState('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState('');

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const baseValues = {
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodes.length > 0 ? diagnosisCodes : undefined,
    };

    switch (type) {
      case 'HealthCheck':
        onSubmit({
          ...baseValues,
          type: 'HealthCheck',
          healthCheckRating: Number(healthCheckRating) as HealthCheckRating,
        });
        break;
      case 'Hospital':
        onSubmit({
          ...baseValues,
          type: 'Hospital',
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        });
        break;
      case 'OccupationalHealthcare':
        onSubmit({
          ...baseValues,
          type: 'OccupationalHealthcare',
          employerName,
          sickLeave:
            sickLeaveStart && sickLeaveEnd
              ? { startDate: sickLeaveStart, endDate: sickLeaveEnd }
              : undefined,
        });
        break;
    }
  };

  return (
    <div>
      {error && <FormHelperText error sx={{ fontSize: '1rem', mb: 2 }}>{error}</FormHelperText>}
      <form onSubmit={addEntry}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Entry Type</InputLabel>
          <Select
            value={type}
            label="Entry Type"
            onChange={(e) => setType(e.target.value as EntryType)}
          >
            <MenuItem value="HealthCheck">Health Check</MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
            <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Description"
          fullWidth
          required
          sx={{ mb: 2 }}
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />

        <TextField
          label="Date"
          type="date"
          fullWidth
          required
          slotProps={{ inputLabel: { shrink: true } }}
          sx={{ mb: 2 }}
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />

        <TextField
          label="Specialist"
          fullWidth
          required
          sx={{ mb: 2 }}
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />

        {/* Diagnosis Codes Multi-Select Dropdown with MenuProps fix */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Diagnosis Codes</InputLabel>
          <Select
            multiple
            value={diagnosisCodes}
            onChange={(e) => {
              const value = e.target.value;
              setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
            }}
            input={<OutlinedInput label="Diagnosis Codes" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((code) => (
                  <Chip key={code} label={code} />
                ))}
              </Box>
            )}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 224,
                  width: 250,
                },
              },
            }}
          >
            {diagnoses.map((diag) => (
              <MenuItem key={diag.code} value={diag.code}>
                {diag.code} - {diag.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {type === 'HealthCheck' && (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Health Check Rating</InputLabel>
            <Select
              value={healthCheckRating}
              label="Health Check Rating"
              onChange={(e) => setHealthCheckRating(Number(e.target.value) as HealthCheckRating)}
            >
              <MenuItem value={HealthCheckRating.Healthy}>0 - Healthy</MenuItem>
              <MenuItem value={HealthCheckRating.LowRisk}>1 - Low Risk</MenuItem>
              <MenuItem value={HealthCheckRating.HighRisk}>2 - High Risk</MenuItem>
              <MenuItem value={HealthCheckRating.CriticalRisk}>3 - Critical Risk</MenuItem>
            </Select>
          </FormControl>
        )}

        {type === 'Hospital' && (
          <>
            <TextField
              label="Discharge Date"
              type="date"
              fullWidth
              required
              slotProps={{ inputLabel: { shrink: true } }}
              sx={{ mb: 2 }}
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <TextField
              label="Discharge Criteria"
              fullWidth
              required
              sx={{ mb: 2 }}
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </>
        )}

        {type === 'OccupationalHealthcare' && (
          <>
            <TextField
              label="Employer Name"
              fullWidth
              required
              sx={{ mb: 2 }}
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <TextField
              label="Sick Leave Start Date"
              type="date"
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
              sx={{ mb: 2 }}
              value={sickLeaveStart}
              onChange={({ target }) => setSickLeaveStart(target.value)}
            />
            <TextField
              label="Sick Leave End Date"
              type="date"
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
              sx={{ mb: 2 }}
              value={sickLeaveEnd}
              onChange={({ target }) => setSickLeaveEnd(target.value)}
            />
          </>
        )}

        <Box display="flex" justifyContent="space-between" gap={2} mt={1}>
          <Button
            color="secondary"
            variant="contained"
            fullWidth
            type="button"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            fullWidth
          >
            Add
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddEntryForm;