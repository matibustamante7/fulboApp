import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getFixtureToday } from "../../../redux/actions";
import { Container, Link, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import "../../../app.css"
import theme from "../../../theme";
export default function MatchsToday() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getFixtureToday())
    }, [dispatch])

    const fixtureToday = useSelector((state) => state.fixtureToday)

    return (
        <Container>
            {
                fixtureToday?.map((fixtureArgentina) => {
                    // console.log(fixtureArgentina.league);
                    if (fixtureArgentina.league.country === "Argentina") {
                        return (
                            <TableContainer component={Paper} sx={{m:5}}>
                                <Table sx={{ border: 2 }} >
                                    <TableHead>
                                        <TableRow sx={{ border: 1 }}>
                                            <TableCell colSpan={7} align="center" sx={{ border: 1 }}>
                                                <Link href={`/competitions/${fixtureArgentina.league.id}`}>
                                                    <Typography variant="h5">{fixtureArgentina.league.name} </Typography>
                                                </Link>
                                                <img className="team_logo" src={fixtureArgentina.league?.flag}></img>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableRow>
                                        <TableCell sx={{ border: 1, width: '10%', backgroundColor: theme.palette.primary.main, textAlign: 'center', color: theme.palette.background.default, fontWeight: 600 }}>
                                            {fixtureArgentina.status?.elapsed ? fixtureArgentina.status.elapsed : <p>Not started</p>}
                                        </TableCell>

                                        <TableCell sx={{ border: 1, width: '30%', backgroundColor: theme.palette.secondary.main, textAlign: 'center' }}>
                                            {fixtureArgentina.teams.home.name}
                                            <img className="team_logo" src={fixtureArgentina.teams.home.logo} />
                                        </TableCell>

                                        <TableCell sx={{ border: 1, width: '10%', textAlign: 'center' }}>
                                            {fixtureArgentina.goals?.home ? fixtureArgentina.goals.home : 0}
                                        </TableCell>

                                        <TableCell sx={{ border: 1, width: '10%', textAlign: 'center' }}>
                                            {fixtureArgentina.goals?.away ? fixtureArgentina.goals.away : 0}
                                        </TableCell>

                                        <TableCell sx={{ border: 1, width: '30%', backgroundColor: theme.palette.secondary.main, textAlign: 'center' }}>
                                            <img className="team_logo" src={fixtureArgentina.teams.away.logo} />{fixtureArgentina.teams.away.name}</TableCell>

                                        <TableCell sx={{ border: 1, width: '10%', backgroundColor: theme.palette.success.main, textAlign: 'center' }}>
                                            <Link href={`/${fixtureArgentina.fixture.id}`}>
                                                <Typography>Formaciones</Typography>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                </Table>
                            </TableContainer>
                        )
                    }
                })
            }
        </Container>
    )
}