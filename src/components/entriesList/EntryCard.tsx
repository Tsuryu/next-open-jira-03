import { DragEvent, FC, useContext } from 'react';

import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';

import { Entry } from '@/interfaces';
import { UIContext } from '@/context';
import { useRouter } from 'next/router';
import { dateUtils } from '@/utils';

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { startDraging, endDraging } = useContext(UIContext);
  const router = useRouter();

  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('text', entry._id);
    startDraging();
  };

  const onDragEnd = () => {
    endDraging();
  };

  const handleClick = () => {
    router.push(`/entries/${entry._id}`);
  };

  return (
    <Card sx={{ marginBottom: 1 }} draggable onDragStart={onDragStart} onDragEnd={onDragEnd} onClick={handleClick}>
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>{entry.description}</Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
          <Typography variant="body2">{dateUtils.getFormatDistanceToNow(entry.createdAt)}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
