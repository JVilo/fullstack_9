import patientData from '../data/patients.ts';
import type { Patient } from '../types.ts';

const getPatients = (): Patient[] => {
    return patientData.map(patient => ({
        ...patient,
        entries: []
    })) as Patient[];
};

export default {
    getPatients
};