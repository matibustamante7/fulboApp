import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFixtureToday } from "../../../redux/actions";
import { Box, CircularProgress, Container, Grid, Link, Modal, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import "../../../App.css"
import theme from "../../../theme";
import TouchAppIcon from '@mui/icons-material/TouchApp';

export default function MatchsToday() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFixtureToday());
  }, [dispatch]);

  const fixtureToday = useSelector((state) => state.fixtureToday);

  // Creamos un objeto para agrupar los partidos por competición
  const matchesByCompetition = {};
  fixtureToday?.forEach((match) => {
    const leagueId = match.league.id;
    if (!matchesByCompetition[leagueId]) {
      matchesByCompetition[leagueId] = [];
    }
    matchesByCompetition[leagueId].push(match);
  });
  // console.log(matchesByCompetition);
  return (
    <>
      {fixtureToday.length === 0 ? (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <Grid container columns={12} spacing={1}>
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ textAlign: 'center', mt: 2 }}>Partidos de hoy</Typography>
            </Grid>

            {Object.keys(matchesByCompetition).length === 0 ? (
              <Typography variant="body1" >No hay eventos para hoy</Typography>
            ) : (
              Object.entries(matchesByCompetition).map(([leagueId, matches]) => (
                <Grid item xs={12} sm={6} md={6}>
                  <TableContainer key={leagueId} component={Paper} sx={{ mt: 1 }}>
                    <Table >
                      <TableHead>
                        <TableRow >
                          <TableCell colSpan={12} align="center">
                            <Link href={`/competitions/${matches[0].league.id}`}>
                              <Typography variant="h7">{matches[0].league.name} </Typography>
                            </Link>
                            <img className="team_logo" src={matches[0].league?.flag}></img>
                          </TableCell>
                        </TableRow>
                      </TableHead>

                      {matches.map((match) => {
                        console.log(match.fixture);
                        const fechayhoraPartido = match.fixture.date;
                        const fecha_hora_obj = new Date(fechayhoraPartido);
                        const hora = fecha_hora_obj.getHours();
                        const minutos = fecha_hora_obj.getMinutes();

                        const horaMinutos = hora + ":" + (minutos < 10 ? "0" : "") + minutos;
                        return (
                          <TableRow key={match.fixture.id} sx={{ height: '5px' }}>
                            <TableCell
                              sx={{
                                p: 1, width: '15%',
                                textAlign: 'center',
                                backgroundColor: match.fixture.status.short === 'FT' ? theme.palette.primary.main : 
                                match.fixture.status.short === 'NS' ? theme.palette.primary.main : 
                                match.fixture.status.short === 'HT' ? theme.palette.menu.secondary :
                                match.fixture.status.short === 'TBD' ? theme.palette.primary.main :
                                match.fixture.status.short === 'PST' ? theme.palette.primary.main :
                                match.fixture.status.short === 'AWD' ? theme.palette.primary.main : 
                                theme.palette.error.main,


                                color: theme.palette.background.default,
                                textShadow:'2px 2px 2px 4px rgba(0, 0, 0, 0.5)',
                                fontWeight: 600
                              }}
                            >
                              { match.fixture.status.short === 'FT' ? <p>Final</p> :
                                match.fixture.status.short === 'HT' ? <p>E.T</p> : 
                                match.fixture.status.short === 'NS' ? horaMinutos :
                                match.fixture.status.short === 'TBD' ? <p>Por definir</p> :
                                match.fixture.status.short === 'PST' ? <p>Susp.</p> :
                                match.fixture.status.short === 'AWD' ? <p>Sin datos</p> :
                                match.fixture.status.elapsed+"'"}
                            </TableCell>

                            <TableCell sx={{ p: 1, width: '30%', backgroundColor: theme.palette.secondary.main, textAlign: "center" }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                <img className="team_logo" src={match.teams.home.logo} />
                                <Link href={`/team/${match.teams.home.name}/${match.teams.home.id}`}>
                                  {match.teams.home.name}
                                </Link>
                              </Box>
                            </TableCell>

                            <TableCell sx={{ p: 1, width: '7%', borderRight: 1, textAlign: "center" }}>
                              {match.goals?.home ? match.goals.home : 0}
                            </TableCell>

                            <TableCell sx={{ p: 1, width: '7%', textAlign: "center" }}>
                              {match.goals?.away ? match.goals.away : 0}
                            </TableCell>

                            <TableCell sx={{ p: 1, width: '30%', backgroundColor: theme.palette.secondary.main, textAlign: "center" }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                <img className="team_logo" src={match.teams.away.logo} />
                                <Link href={`/team/${match.teams.away.name}/${match.teams.away.id}`}>
                                  {match.teams.away.name}
                                </Link>
                              </Box>
                            </TableCell>

                            <TableCell sx={{ p: 1, width: '10%', backgroundColor: theme.palette.menu.primary, textAlign: "center" }}>
                              <Link href={`/${match.fixture?.id}`}>
                                <TouchAppIcon />
                              </Link>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </Table>
                  </TableContainer>
                </Grid>
              )))}
          </Grid>
        </div>)
      }
    </>

  );
}
