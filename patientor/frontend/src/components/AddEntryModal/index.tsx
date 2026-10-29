import { Dialog, DialogTitle, DialogContent, Divider } from '@mui/material';
import AddEntryForm from './AddEntryForm';
import { EntryWithoutId, Diagnosis } from '../../types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  diagnoses: Diagnosis[];
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, diagnoses, error }: Props) => (
  <Dialog open={modalOpen} onClose={onClose} fullWidth maxWidth="sm">
    <DialogTitle>Add a new patient entry</DialogTitle>
    <Divider />
    <DialogContent>
      <AddEntryForm onSubmit={onSubmit} onCancel={onClose} diagnoses={diagnoses} error={error} />
    </DialogContent>
  </Dialog>
);

export default AddEntryModal;