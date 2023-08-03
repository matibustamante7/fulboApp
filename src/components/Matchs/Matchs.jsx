import { TableContainer, Paper, Table, TableHead, TableCell, Typography, TableRow, Link, Box, Container, Grid } from "@mui/material";
import theme from "../../theme";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFixtureInlive } from "../../redux/actions";
import './matchs.css'

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
        <Container  >
            <Typography variant="h3">Matches live</Typography>
            {Object.entries(matchesByCompetition).map(([leagueName, matches]) => (
                <TableContainer key={leagueName} component={Paper} sx={{ m: 5 }}>
                    <Table sx={{ border: 2 }} >
                        <TableHead>
                            <TableRow sx={{ border: 1 }}>
                                <TableCell colSpan={7} align="center" sx={{ border: 1 }}>
                                    <Link href={`/competitions/${matches[0].league.id}`}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Typography variant="h5">{leagueName} </Typography>
                                            <img className="team_logo" src={matches[0].league?.flag}></img>
                                        </Box>

                                    </Link>

                                </TableCell>
                            </TableRow>
                            {matches.map((match) => (
                                <TableRow key={match.fixture.id}>
                                <TableCell sx={{width:'5%', border: 1, backgroundColor: theme.palette.primary.main, textAlign: "center", color: theme.palette.background.default, fontWeight: 600 }}>
                                  {match.fixture.status.elapsed}'
                                </TableCell>
                          
                                <TableCell sx={{width:'35%', border: 1, backgroundColor: theme.palette.secondary.main, textAlign: "center" }}>
                                  <Grid container alignItems="center" justifyContent="center">
                                    {match.teams.home.name}
                                    <img className="team_logo" src={match.teams.home.logo} />
                                  </Grid>
                                </TableCell>
                          
                                <TableCell sx={{width:'5%', border: 1, textAlign: "center" }}>
                                  {match.goals.home}
                                </TableCell>
                          
                                <TableCell sx={{width:'5%', border: 1, textAlign: "center" }}>
                                  {match.goals.away}
                                </TableCell>
                          
                                <TableCell sx={{width:'35%', border: 1, backgroundColor: theme.palette.secondary.main, textAlign: "center" }}>
                                  <Grid container alignItems="center" justifyContent="center">
                                    <img className="team_logo" src={match.teams.away.logo} />
                                    {match.teams.away.name}
                                  </Grid>
                                </TableCell>
                          
                                <TableCell sx={{width:'15%', border: 1, backgroundColor: theme.palette.success.main, textAlign: "center" }}>
                                  <Link href={`/${match.fixture?.id}`}>
                                    <Typography>Formaciones</Typography>
                                  </Link>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableHead>
                        {/* Resto del contenido de la tabla */}
                    </Table>
                </TableContainer>
            ))}
        </Container>
    );
}
