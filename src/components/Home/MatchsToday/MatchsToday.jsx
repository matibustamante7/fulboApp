import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFixtureToday } from "../../../redux/actions";
import { Box, Container, Grid, Link, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import "../../../app.css";
import theme from "../../../theme";

export default function MatchsToday() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getFixtureToday());
    }, [dispatch]);

    const fixtureToday = useSelector((state) => state.fixtureToday);

    // Creamos un objeto para agrupar los partidos por competición
    const matchesByCompetition = {};
    fixtureToday?.forEach((match) => {
        const leagueName = match.league.name;
        if (!matchesByCompetition[leagueName]) {
            matchesByCompetition[leagueName] = [];
        }
        matchesByCompetition[leagueName].push(match);
    });

    return (
        <Container>
            <Typography variant="h3">Matches today</Typography>
            {Object.entries(matchesByCompetition).map(([leagueName, matches]) => (
                <TableContainer key={leagueName} component={Paper} sx={{ m: 5,  borderRadius: 1, border: 1 }}>
                    <Table >
                        <TableHead>
                            <TableRow >
                                <TableCell colSpan={7} align="center" sx={{ border: 1 }}>
                                    <Link href={`/competitions/${matches[0].league.id}`}>
                                        <Typography variant="h6">{leagueName} </Typography>
                                    </Link>
                                    <img className="team_logo" src={matches[0].league?.flag}></img>
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        {matches.map((match) => (
                            <TableRow key={match.fixture.id}>
                            <TableCell
                              sx={{
                                border: 1,
                                width: "5%",
                                backgroundColor: theme.palette.primary.main,
                                textAlign: "center",
                                color: theme.palette.background.default,
                                fontWeight: 600,
                              }}
                            >
                              {match.status?.elapsed ? match.status.elapsed : <p>-</p>}
                            </TableCell>
                      
                            <TableCell sx={{ width:'35%',border: 1, backgroundColor: theme.palette.secondary.main, textAlign: "center" }}>
                              <Grid container alignItems="center" justifyContent="center">
                                {match.teams.home.name}
                                <img className="team_logo" src={match.teams.home.logo} />
                              </Grid>
                            </TableCell>
                      
                            <TableCell sx={{width:'5%', border: 1, textAlign: "center" }}>
                              {match.goals?.home ? match.goals.home : 0}
                            </TableCell>
                      
                            <TableCell sx={{width:'5%', border: 1, textAlign: "center" }}>
                              {match.goals?.away ? match.goals.away : 0}
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
                    </Table>
                </TableContainer>
            ))}
        </Container>
    );
}
