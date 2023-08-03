import { useState, useEffect } from 'react';
import { Box, Container, LinearProgress, Typography } from '@mui/material';
import Matchs from '../Matchs/Matchs';
import MatchsToday from './MatchsToday/MatchsToday';

export default function Home() {
  // Estado para controlar si se muestra el indicador de progreso o no
  const [loading, setLoading] = useState(true);

  // Simulamos una carga inicial de 3 segundos para este ejemplo
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Container sx={{display:'flex', flexDirection:'column', justifyContent:'center', textAlign: 'center', marginTop: 4 }}>
      {loading && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
      {/* mostrar un aside con el top 10 ligas del mundo, libertadores, sudamericana, champions, europa league, conference league, concachampions, mls, qualed mundial */}
      <Matchs />
      <MatchsToday />
    </Container>
  );
}
