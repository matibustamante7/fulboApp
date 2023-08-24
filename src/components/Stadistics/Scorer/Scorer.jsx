import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"

import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import "../../../App.css"
import { getScorersCompetition } from "../../../redux/actions";
export default function Scorer({ idCompetition }) {
    // console.log(idCompetition);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getScorersCompetition(idCompetition))
    }, [dispatch])
    const players = useSelector((state) => state.scorers)
    // console.log(players);
    return (
            <TableContainer component={Paper} sx={{ textAlign: 'center'}}>
                <Typography variant="h4">Scorers</Typography>
                <Table>
                    <TableHead>
                        {/* <TableCell>Position</TableCell> */}
                        <TableCell sx={{ fontWeight: 600, p: 1, m: 0 }}>Jugador</TableCell>
                        <TableCell sx={{ fontWeight: 600, p: 1, m: 0 }}>Equipo</TableCell>
                        <TableCell sx={{ fontWeight: 600, p: 1, m: 0 }}>Goles</TableCell>
                        <TableCell sx={{ fontWeight: 600, p: 1, m: 0 }}>Penal</TableCell>
                        {/* <TableCell sx={{ fontWeight: 600, p: 1, m: 0 }}>Shots</TableCell>
                        <TableCell sx={{ fontWeight: 600, p: 1, m: 0 }}>Shots on goal</TableCell> */}
                    </TableHead>
                    {   
                        players.length===0 ? '' :
                        players?.map((player) => {
                            // console.log(player.statistics);
                            return (
                                <TableRow key={player.player.id}>
                                    <TableCell sx={{ fontWeight: 600,  p: 1, m: 0 }}>{player.player.name}</TableCell>
                                    {
                                        player.statistics.map((statistic) => {
                                            // console.log(statistic);
                                            return (
                                                <>
                                                    <TableCell sx={{ p: 1, m: 0 }}><img className="img_mini_logo" src={statistic.team.logo} /> {statistic.team.name}</TableCell >
                                                    <TableCell sx={{ fontWeight: 600,  p: 1, m: 0 }}>{statistic.goals?.total}</TableCell>
                                                    <TableCell sx={{ p: 1, m: 0 }}>{statistic.penalty?.scored}</TableCell>
                                                    {/* <TableCell sx={{ p: 1, m: 0 }}>{statistic.shots?.total}</TableCell>
                                                    <TableCell sx={{ p: 1, m: 0 }}>{statistic.shots?.on}</TableCell> */}
                                                </>
                                            )
                                        })
                                    }
                                </TableRow>
                            )
                        })
                    }
                </Table>
            </TableContainer>
    )
}