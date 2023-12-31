import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"

import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import "../../../App.css"
import { getScorersCompetition } from "../../../redux/actions";
import theme from "../../../theme";
export default function Scorer({ idCompetition }) {
    // console.log(idCompetition);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getScorersCompetition(idCompetition))
    }, [dispatch])
    const players = useSelector((state) => state.scorers)
    // console.log(players);
    return (
        <TableContainer component={Paper} sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{
                backgroundColor: theme.palette.menu.primary,
                color: theme.palette.background.default
            }}>Scorers</Typography>
            <Table>
                <TableHead>
                    {/* <TableCell>Position</TableCell> */}
                    <TableCell sx={{
                        fontWeight: 600, p: 1, m: 0,
                        color: theme.palette.background.default, backgroundColor: theme.palette.menu.primary
                    }}>Jugador</TableCell>
                    <TableCell sx={{
                        fontWeight: 600, p: 1, m: 0,
                        color: theme.palette.background.default, backgroundColor: theme.palette.menu.primary
                    }}>Equipo</TableCell>
                    <TableCell sx={{
                        fontWeight: 600, p: 1, m: 0,
                        color: theme.palette.background.default, backgroundColor: theme.palette.menu.primary
                    }}>Goles</TableCell>
                    <TableCell sx={{
                        fontWeight: 600, p: 1, m: 0,
                        color: theme.palette.background.default, backgroundColor: theme.palette.menu.primary
                    }}>Penal</TableCell>
                    {/* <TableCell sx={{ fontWeight: 600, p: 1, m: 0 }}>Shots</TableCell>
                        <TableCell sx={{ fontWeight: 600, p: 1, m: 0 }}>Shots on goal</TableCell> */}
                </TableHead>
                {
                    players.length === 0 ? '' :
                        players?.map((player) => {
                            // console.log(player.statistics);
                            return (
                                <TableRow key={player.player.id}>
                                    <TableCell sx={{ fontWeight: 600, p: 1, m: 0 }}>{player.player.name}</TableCell>
                                    {
                                        player.statistics.length > 0 && (
                                            <>
                                                <TableCell sx={{ p: 1, m: 0 }}>
                                                    <img className="img_mini_logo" src={player.statistics[0].team.logo} /> {player.statistics[0].team.name}
                                                </TableCell>
                                                <TableCell sx={{ fontWeight: 600, p: 1, m: 0 }}>{player.statistics[0].goals?.total}</TableCell>
                                                <TableCell sx={{ p: 1, m: 0 }}>{player.statistics[0].penalty?.scored}</TableCell>
                                                {/* <TableCell sx={{ p: 1, m: 0 }}>{player.statistics[0].shots?.total}</TableCell>
                                                <TableCell sx={{ p: 1, m: 0 }}>{player.statistics[0].shots?.on}</TableCell> */}
                                            </>
                                        )
                                    }

                                </TableRow>
                            )
                        })
                }
            </Table>
        </TableContainer>
    )
}