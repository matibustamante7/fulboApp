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
        <Container sx={{margin:4, width:'45%'}}>
            <TableContainer component={Paper} sx={{textAlign:'center', padding:2, maxHeight:600}}>
                <Typography variant="h4">Scorers</Typography>
                <Table>
                    <TableHead>
                        {/* <TableCell>Position</TableCell> */}
                        <TableCell sx={{ fontWeight: 600 }}>Player</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Team</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Goals</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Penalty</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Shots</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Shots on goal</TableCell>
                    </TableHead>
                    {
                        players?.map((player) => {
                            // console.log(player.statistics);
                            return (
                                <TableRow key={player.player.id}>
                                    <TableCell sx={{ fontWeight: 600 }}>{player.player.name}</TableCell>
                                    {
                                        player.statistics.map((statistic) => {
                                            // console.log(statistic);
                                            return (
                                                <>
                                                    <TableCell><img className="img_mini_logo" src={statistic.team.logo} /> {statistic.team.name}</TableCell >
                                                    <TableCell sx={{ fontWeight: 600 }}>{statistic.goals?.total}</TableCell>
                                                    <TableCell>{statistic.penalty?.scored}</TableCell>
                                                    <TableCell>{statistic.shots?.total}</TableCell>
                                                    <TableCell>{statistic.shots?.on}</TableCell>
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
        </Container >
    )
}