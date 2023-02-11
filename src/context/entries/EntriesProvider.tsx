import { FC, PropsWithChildren, useReducer, useEffect } from 'react';

import { useSnackbar } from 'notistack';

import { Entry } from '@/interfaces';
import { entriesApi } from '@/api';
import { EntriesContext } from './EntriesContext';
import { EntriesReducer } from './EntriesReducer';
import { EntriesState } from './interfaces';

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: []
};

export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(EntriesReducer, ENTRIES_INITIAL_STATE);
  const { enqueueSnackbar } = useSnackbar();

  const refreshEntires = async () => {
    const { data } = await entriesApi.get<{ entries: Entry[] }>('/entries');
    dispatch({ type: 'Entries - Set entries', payload: data.entries });
  };

  useEffect(() => {
    refreshEntires();
  }, []);

  const addNewEntry = async (description: string) => {
    const { data } = await entriesApi.post<{ entry: Entry }>('/entries', {
      description
    });
    dispatch({ type: 'Entries - Add entry', payload: data.entry });
  };

  const updateEntry = async ({ _id, description, status }: Entry) => {
    const { data } = await entriesApi.put<{ entry: Entry }>(`/entries/${_id}`, {
      description,
      status
    });
    dispatch({
      type: 'Entries - Entry Updated',
      payload: data.entry
    });
    enqueueSnackbar('Entrada actualizada', {
      variant: 'success',
      autoHideDuration: 1500,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      }
    });
  };

  const deleteEntry = async (id: string) => {
    await entriesApi.delete(`/entries/${id}`);
    dispatch({
      type: 'Entries - Delete entry',
      payload: id
    });
    enqueueSnackbar('Entrada borrada', {
      variant: 'success',
      autoHideDuration: 1500,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      }
    });
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <EntriesContext.Provider value={{ ...state, addNewEntry, deleteEntry, updateEntry }}>
      {children}
    </EntriesContext.Provider>
  );
};
