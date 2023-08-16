import { TableContainer, Paper, Table, TableHead, TableCell, Typography, TableRow, Link, Box, Container, Grid, TableBody } from "@mui/material";
import theme from "../../theme";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFixtureInlive } from "../../redux/actions";
import './matchs.css'
import TouchAppIcon from '@mui/icons-material/TouchApp';


export default function Matchs() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFixtureInlive())
  }, [dispatch])

  const matchesInLive = useSelector((state) => state.fixtureInLive);

  // Creamos un objeto para agrupar los partidos por competición
  const matchesByCompetition = {};
  matchesInLive?.forEach((match) => {
    const leagueName = match.league.name;
    if (!matchesByCompetition[leagueName]) {
      matchesByCompetition[leagueName] = [];
    }
    matchesByCompetition[leagueName].push(match);
  });

  return (
    <Grid container columns={12} >
      <Typography variant="h5" sx={{textAlign:'center'}}>Matches live</Typography>

      {Object.keys(matchesByCompetition).length === 0 ? (
        <Typography variant="body1">No hay eventos en vivo para mostrar</Typography>
      ) : (
        Object.entries(matchesByCompetition).map(([leagueName, matches]) => (
          <Grid item xs={12}>
          <TableContainer key={leagueName} component={Paper} sx={{mt:1}}>
            <Table >
                <TableHead >
                  <TableCell colSpan={12} align="center" >
                    {/* nombre de la liga */}
                    <Link href={`/competitions/${matches[0].league.id}`}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="body1">{leagueName} </Typography>
                        <img className="team_logo" src={matches[0].league?.flag}></img>
                      </Box>
                    </Link>
                  </TableCell>
                </TableHead>
                {matches.map((match) => (
                  <TableRow key={match.fixture.id} >
                    {/* tiempo de juego */}
                    <TableCell sx={{p:1,width:'15%', backgroundColor: theme.palette.primary.main, color: theme.palette.background.default, fontWeight: 600 }}>
                      {match.fixture.status.elapsed}'
                    </TableCell>

                    <TableCell sx={{ p:1,width:'30%',  backgroundColor: theme.palette.secondary.main, textAlign: "center" }}>
                      <Box sx={{display:'flex', alignItems:'center', flexDirection:'column'}}>
                      <img className="team_logo" src={match.teams.home.logo} />
                        <Link href={`/team/${match.teams.home.name}/${match.teams.home.id}`}>
                          {match.teams.home.name}
                        </Link>
                      </Box>
                    </TableCell>

                    <TableCell sx={{p:1,width:'7%', borderRight:1, textAlign: "center" }}>
                      {match.goals.home}
                    </TableCell>

                    <TableCell sx={{ p:1,width:'7%', textAlign: "center" }}>
                      {match.goals.away}
                    </TableCell>

                    <TableCell sx={{ p:1,width:'30%',  backgroundColor: theme.palette.secondary.main, textAlign: "center" }}>
                      <Box sx={{display:'flex', alignItems:'center', flexDirection:'column'}}>
                        <img className="team_logo" src={match.teams.away.logo} />
                        <Link href={`/team/${match.teams.away.name}/${match.teams.away.id}`}>
                          {match.teams.away.name}
                        </Link>
                      </Box>
                    </TableCell>

                    <TableCell sx={{p:1,width:'10%', backgroundColor: theme.palette.success.main, textAlign: "center" }}>
                      <Link href={`/${match.fixture?.id}`}>
                        <TouchAppIcon/>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              
              {/* Resto del contenido de la tabla */}
            </Table>
          </TableContainer>
        </Grid>
        )))}
    </Grid>
  );
}
