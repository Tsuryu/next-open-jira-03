import { Card, CardHeader, Grid } from '@mui/material';

import { Layout } from '@/layouts';
import { EntriesList, NewEntry } from '@/components';

export default function HomePage() {
  return (
    <Layout title="Home - OpenJira">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          {/* <Card sx={{ height: 'calc(100vh - 100px)' }}> */}
          <Card>
            <CardHeader title="Pendientes" />
            {/* <NewEntry /> */}
            <EntriesList status="pending" />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardHeader title="En Progreso" />
            <EntriesList status="in-progress" />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardHeader title="Completadas" />
            <EntriesList status="finished" />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}
