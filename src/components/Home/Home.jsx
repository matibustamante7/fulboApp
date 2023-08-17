import { useState, useEffect } from 'react';
import { Box, Container, Grid, LinearProgress } from '@mui/material';
import Matchs from '../Matchs/Matchs';
import MatchsToday from './MatchsToday/MatchsToday';
import CircularProgress from '@mui/material/CircularProgress';

export default function Home() {
  // Estado para controlar si se muestra el indicador de progreso o no
  const [loading, setLoading] = useState(true);

  // Simulamos una carga inicial de 3 segundos para este ejemplo
  useEffect(() => {
    // const timer = setTimeout(() => {
    //   setLoading(false);
    // }, 4000);

    // return () => clearTimeout(timer);
  }, []);

  return (
    <div >
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <Matchs />
          </Grid>
          <Grid item xs={12}>
            <MatchsToday />
          </Grid>
        </Grid>
      </Container>
      
    </div>
  );
}
