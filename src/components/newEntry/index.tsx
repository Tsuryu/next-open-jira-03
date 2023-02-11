import { useState, ChangeEvent, useContext } from 'react';

import { Box, Button, TextField } from '@mui/material';
import { grey } from '@mui/material/colors';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import { EntriesContext, UIContext } from '@/context';

export const NewEntry = () => {
  const { addNewEntry } = useContext(EntriesContext);
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);
  const [inputValue, setInputValue] = useState('');
  const [touched, setTouched] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const resetFormStatus = () => {
    setInputValue('');
    setTouched(false);
    setIsAddingEntry(false);
  };

  const handleSave = () => {
    if (inputValue.length === 0) {
      setTouched(true);
      return;
    }
    addNewEntry(inputValue);
    resetFormStatus();
  };

  const handleCancelar = () => {
    resetFormStatus();
  };

  return (
    <Box
      sx={{
        padding: 1,
        position: 'sticky',
        top: 0,
        zIndex: 1,
        backgroundColor: grey[900]
      }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            autoFocus
            multiline
            label="Nueva entrada"
            helperText={touched && inputValue.length === 0 && 'Ingrese una valor'}
            error={touched && inputValue.length === 0}
            value={inputValue}
            onChange={handleInputChange}
            // onBlur={() => setTouched(true)}
          />
          <Box display="flex" justifyContent="space-between">
            <Button variant="text" onClick={handleCancelar}>
              Cancelar
            </Button>
            <Button variant="outlined" color="secondary" endIcon={<SaveOutlinedIcon />} onClick={handleSave}>
              Guardar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          startIcon={<AddCircleOutlineOutlinedIcon />}
          fullWidth
          variant="outlined"
          onClick={() => setIsAddingEntry(true)}>
          Agregar tarea
        </Button>
      )}
    </Box>
  );
};
