import { DragEvent, FC, useContext, useMemo } from 'react';

import { List, Paper } from '@mui/material';

import styles from '@/styles/EntryList.module.css';
import { EntryStatus } from '@/interfaces';
import { EntriesContext, UIContext } from '@/context';
import { EntryCard } from './EntryCard';
import { NewEntry } from '../newEntry';

interface Props {
  status: EntryStatus;
}

export const EntriesList: FC<Props> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, endDraging } = useContext(UIContext);
  const entriesByStatus = useMemo(() => entries.filter((entry) => entry.status === status), [entries, status]);

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('text');
    const entry = entries.find((e) => e._id === id)!;
    updateEntry({ ...entry, status });
    endDraging();
  };

  return (
    <div
      style={{ overflowY: 'scroll', height: 'calc(100vh - 180px)', display: 'flex', flexDirection: 'column' }}
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? styles.dragging : ''}>
      {status === 'pending' && <NewEntry />}
      <Paper
        sx={{
          backgroundColor: 'transparent',
          padding: '5px',
          flexGrow: 1
        }}>
        <List sx={{ opacity: isDragging ? 0.2 : 1, padding: 0, transition: 'all .3s' }}>
          {entriesByStatus.map((entry) => (
            // eslint-disable-next-line no-underscore-dangle
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
