import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAssistsCompetition } from "../../../redux/actions";
import { Container, Paper, Table, TableCell, TableBody, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import "../../../App.css"
import theme from "../../../theme";
export default function Assists({ idCompetition }) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAssistsCompetition(idCompetition))
    }, [dispatch])
    const players = useSelector((state) => state.assists)
    // console.log(players);
    return (
        <TableContainer component={Paper} sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{
                backgroundColor: theme.palette.menu.primary,
                color: theme.palette.background.default
            }} >Asistidores</Typography>
            <Table>
                <TableHead sx={{ backgroundColor: theme.palette.menu.primary }}>
                    <TableCell sx={{
                        fontWeight: 600, p: 1, m: 0,
                        color: theme.palette.background.default
                    }}>Jugador</TableCell>
                    <TableCell sx={{
                        fontWeight: 600, p: 1, m: 0,
                        color: theme.palette.background.default
                    }}>Equipo</TableCell>
                    <TableCell sx={{
                        fontWeight: 600, p: 1, m: 0,
                        color: theme.palette.background.default
                    }}>Asistencias</TableCell>
                    {/* <TableCell sx={{ fontWeight: 600 }}>Passes</TableCell> */}
                    <TableCell sx={{
                        fontWeight: 600, p: 1, m: 0,
                        color: theme.palette.background.default
                    }}>Pases clave</TableCell>
                    {/* <TableCell sx={{ fontWeight: 600 }}>Passes accuracy</TableCell> */}
                </TableHead>
                {/* <TableBody> */}
                {
                    players?.map((player) => (
                        <TableRow key={player.player.id}>
                            <TableCell sx={{ fontWeight: 600, p: 1, m: 0 }}>{player.player.name}</TableCell>
                            {player.statistics.length > 0 && (
                                <React.Fragment key={player.statistics[0].team.id}>
                                    <TableCell sx={{ p: 1, m: 0 }}>
                                        <img className="img_mini_logo" src={player.statistics[0].team.logo} /> {player.statistics[0].team.name}
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600, p: 1, m: 0 }}>{player.statistics[0].goals?.assists}</TableCell>
                                    {/* <TableCell sx={{ p: 1, m: 0 }}>{player.statistics[0].passes?.total}</TableCell> */}
                                    <TableCell sx={{ p: 1, m: 0 }}>{player.statistics[0].passes?.key}</TableCell>
                                    {/* <TableCell sx={{ p: 1, m: 0 }}>{player.statistics[0].passes?.accuracy}</TableCell> */}
                                </React.Fragment>
                            )}
                        </TableRow>
                    ))
                }

                {/* </TableBody> */}
            </Table>
        </TableContainer>
    )
}
