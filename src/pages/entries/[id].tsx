import { ChangeEvent, FC, useMemo, useState, useContext } from 'react';

import { GetServerSideProps } from 'next';
import {
  Button,
  capitalize,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField
} from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

import { Layout } from '@/layouts';
import { Entry, EntryStatus } from '@/interfaces';
import { getEntryById } from '@/database';
import { EntriesContext } from '@/context';
import { dateUtils } from '@/utils';
import { useRouter } from 'next/router';

interface Props {
  entry: Entry;
}

const VALID_STATUS: EntryStatus[] = ['pending', 'in-progress', 'finished'];

const EntryPage: FC<Props> = ({ entry }) => {
  const router = useRouter();
  const { updateEntry, deleteEntry } = useContext(EntriesContext);
  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);

  const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue.length, touched]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus);
  };

  const handleSave = () => {
    if (inputValue.trim().length === 0) {
      setInputValue('');
      setTouched(true);
      return;
    }
    setTouched(false);

    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue
    };
    updateEntry(updatedEntry);
  };

  const handleDeleteEntry = () => {
    deleteEntry(entry._id);
    router.push('/');
  };

  return (
    <Layout>
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader title="Entrada" subheader={`Creada ${dateUtils.getFormatDistanceToNow(entry.createdAt)}`} />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder={`Nueva entrada ${inputValue}`}
                autoFocus
                multiline
                label="Nueva entrada"
                value={inputValue}
                onChange={handleInputChange}
                helperText={isNotValid && 'Ingrese un valor'}
                error={isNotValid}
              />
              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup row value={status} onChange={handleStatusChange}>
                  {VALID_STATUS.map((option) => (
                    <FormControlLabel key={option} value={option} control={<Radio />} label={capitalize(option)} />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<SaveOutlinedIcon />}
                variant="contained"
                fullWidth
                onClick={handleSave}
                disabled={inputValue.length <= 0}>
                Guardar
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <IconButton
        sx={{ position: 'fixed', bottom: 30, right: 30, backgroundColor: 'error.dark' }}
        onClick={handleDeleteEntry}>
        <DeleteForeverOutlinedIcon />
      </IconButton>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };
  const entry = await getEntryById(id);

  if (!entry) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }

  return {
    props: {
      entry
    }
  };
};

export default EntryPage;
