import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFixtureToday } from "../../../redux/actions";
import { Box, Container, Grid, Link, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import "../../../App.css"
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
    const leagueId = match.league.id;
    if (!matchesByCompetition[leagueId]) {
      matchesByCompetition[leagueId] = [];
    }
    matchesByCompetition[leagueId].push(match);
  });
  console.log(matchesByCompetition);
  return (
    <Container sx={{ marginBottom: 20 }}>
        <Typography variant="h5">Matches today</Typography>

      {Object.keys(matchesByCompetition).length === 0 ? (
      <Typography variant="body1" >No hay eventos para hoy</Typography>
  ) : (
      Object.entries(matchesByCompetition).map(([leagueId, matches]) => (
        <TableContainer key={leagueId} component={Paper} sx={{ m: 5, borderRadius: 1, border: 1 }}>
          <Table >
            <TableHead>
              <TableRow >
                <TableCell colSpan={7} align="center" sx={{ border: 1 }}>
                  <Link href={`/competitions/${matches[0].league.id}`}>
                    <Typography variant="h7">{matches[0].league.name} </Typography>
                  </Link>
                  <img className="team_logo" src={matches[0].league?.flag}></img>
                </TableCell>
              </TableRow>
            </TableHead>

            {matches.map((match) => (
              <TableRow key={match.fixture.id} sx={{ height: '5px' }}>
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

                <TableCell sx={{ width: '35%', border: 1, backgroundColor: theme.palette.secondary.main, textAlign: "center" }}>
                  <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-evenly'}}>
                    <Link href={`/team/${match.teams.home.name}/${match.teams.home.id}`}>
                      {match.teams.home.name}
                    </Link>
                    <img className="team_logo" src={match.teams.home.logo} />
                  </Box>
                </TableCell>

                <TableCell sx={{ width: '5%', border: 1, textAlign: "center" }}>
                  {match.goals?.home ? match.goals.home : 0}
                </TableCell>

                <TableCell sx={{ width: '5%', border: 1, textAlign: "center" }}>
                  {match.goals?.away ? match.goals.away : 0}
                </TableCell>

                <TableCell sx={{ width: '35%', border: 1, backgroundColor: theme.palette.secondary.main, textAlign: "center" }}>
                  <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-evenly'}}>
                    <img className="team_logo" src={match.teams.away.logo} />
                    <Link href={`/team/${match.teams.away.name}/${match.teams.away.id}`}>
                      {match.teams.away.name}
                    </Link>
                  </Box>
                </TableCell>

                <TableCell sx={{ width: '15%', border: 1, backgroundColor: theme.palette.success.main, textAlign: "center" }}>
                  <Link href={`/${match.fixture?.id}`}>
                    <Typography>Formaciones</Typography>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </TableContainer>
      )))}
    </Container>
  );
}
