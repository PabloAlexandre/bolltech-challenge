import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import  DialogComponent from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from '../../hooks/useForm';

interface Props {
  title: string;
  description: string;
  initialValue: string;
  opened: boolean;
  onConfirm: (value: string) => void
  onClose: () => void;
}
export const Dialog = ({ title, description, onConfirm, onClose, opened, initialValue }: Props) => {
  const { setValue, setRawValue, getValue } = useForm({
    value: initialValue
  });

  useEffect(() => {
    if(opened) setRawValue('value', initialValue);
  }, [opened]);

  return (
    <div>
      <DialogComponent open={opened} onClose={onClose}>
        <DialogTitle>{ title }</DialogTitle>
        <DialogContent>
          <DialogContentText>
           { description }
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="New Value"
            type="text"
            fullWidth
            variant="standard"
            value={getValue('value')}
            onChange={setValue('value')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={() => onConfirm(getValue('value').toString())}>Save</Button>
        </DialogActions>
      </DialogComponent>
    </div>
  );
}