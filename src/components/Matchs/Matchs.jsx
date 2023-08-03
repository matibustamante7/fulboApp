import { TableContainer, Paper, Table, TableHead, TableCell, Typography, TableRow, Link } from "@mui/material";
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
    // console.log(matchesInLive);

    return (
        <>
            {matchesInLive?.map((match) => (
                <TableContainer key={match.fixture.id} component={Paper} sx={{ m: 5 }}>
                    <Table sx={{ border: 2 }} >
                        <TableHead>
                            <TableRow sx={{ border: 1 }}>
                                <TableCell colSpan={7} align="center" sx={{ border: 1 }}>
                                    <Link href={`/competitions/${match.league.id}`}>
                                        <Typography variant="h5">{match.league.name} </Typography>
                                    </Link>
                                    <img className="team_logo" src={match.league?.flag}></img>
                                </TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell sx={{ border: 1, width: '10%', backgroundColor: theme.palette.primary.main, textAlign: 'center', color: theme.palette.background.default, fontWeight: 600 }}>{match.fixture.status.elapsed}'</TableCell>

                                <TableCell sx={{ border: 1, width: '30%', backgroundColor: theme.palette.secondary.main, textAlign: 'center' }}>
                                    {match.teams.home.name}
                                    <img className="team_logo" src={match.teams.home.logo}></img>
                                </TableCell>

                                <TableCell sx={{ border: 1, width: '10%', textAlign: 'center' }}>
                                    {match.goals.home}
                                </TableCell>

                                <TableCell sx={{ border: 1, width: '10%', textAlign: 'center' }}>
                                    {match.goals.away}
                                </TableCell>

                                <TableCell sx={{ border: 1, width: '30%', backgroundColor: theme.palette.secondary.main, textAlign: 'center' }}>
                                    <img className="team_logo" src={match.teams.away.logo}></img>
                                    {match.teams.away.name}
                                </TableCell>

                                <TableCell sx={{ border: 1, width: '10%', backgroundColor: theme.palette.success.main, textAlign: 'center' }}>
                                    <Link href={`/${match.fixture.id}`}>
                                        <Typography>Formaciones</Typography>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        {/* Resto del contenido de la tabla */}
                    </Table>
                </TableContainer>
            ))}
        </>
    );
}
