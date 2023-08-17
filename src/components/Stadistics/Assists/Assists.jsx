import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAssistsCompetition} from "../../../redux/actions";
import { Container, Paper, Table, TableCell, TableBody, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import "../../../App.css"
export default function Assists({ idCompetition }) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAssistsCompetition(idCompetition))
    }, [dispatch])
    const players = useSelector((state) => state.assists)
    // console.log(players);
    return (
            <TableContainer component={Paper} sx={{ textAlign: 'center'}}>
                <Typography variant="h4">Assistants</Typography>
                <Table>
                    <TableHead>
                        <TableCell sx={{ fontWeight: 600, p: 1, m: 0 }}>Player</TableCell>
                        <TableCell sx={{ fontWeight: 600 , p: 1, m: 0}}>Team</TableCell>
                        <TableCell sx={{ fontWeight: 600, p: 1, m: 0 }}>Assists</TableCell>
                        {/* <TableCell sx={{ fontWeight: 600 }}>Passes</TableCell> */}
                        <TableCell sx={{ fontWeight: 600, p: 1, m: 0 }}>Passes key</TableCell>
                        {/* <TableCell sx={{ fontWeight: 600 }}>Passes accuracy</TableCell> */}
                    </TableHead>
                    {/* <TableBody> */}
                        {   
                            players?.map((player) => (
                            <TableRow key={player.player.id}>
                                <TableCell sx={{ fontWeight: 600, p: 1, m: 0 }}>{player.player.name}</TableCell>
                                {player.statistics.map((statistic) => (
                                    <React.Fragment key={statistic.team.id}>
                                        <TableCell sx={{ p: 1, m: 0 }}>
                                            <img className="img_mini_logo" src={statistic.team.logo} /> {statistic.team.name}
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 600, p: 1, m: 0 }}>{statistic.goals?.assists}</TableCell>
                                        {/* <TableCell sx={{ p: 1, m: 0 }}>{statistic.passes?.total}</TableCell> */}
                                        <TableCell sx={{ p: 1, m: 0 }}>{statistic.passes?.key}</TableCell>
                                        {/* <TableCell sx={{ p: 1, m: 0 }}>{statistic.passes?.accuracy}</TableCell> */}
                                    </React.Fragment>
                                ))}
                            </TableRow>
                        ))}
                    {/* </TableBody> */}
                </Table>
            </TableContainer>
    )
}
