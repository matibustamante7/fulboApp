import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAssistsCompetition} from "../../../redux/actions";
import { Container, Paper, Table, TableCell, TableBody, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import "../../../app.css"
export default function Assists({ idCompetition }) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAssistsCompetition(idCompetition))
    }, [dispatch])
    const players = useSelector((state) => state.assists)

    return (
        <Container sx={{ margin: 4, width: '45%' }}>
            <TableContainer component={Paper} sx={{ textAlign: 'center', padding: 2, maxHeight: 600 }}>
                <Typography variant="h4">Assistants</Typography>
                <Table>
                    <TableHead>
                        <TableCell sx={{ fontWeight: 600 }}>Player</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Team</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Assists</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Passes</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Passes key</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Passes accuracy</TableCell>
                    </TableHead>
                    {/* <TableBody> */}
                        {players?.map((player) => (
                            <TableRow key={player.player.id}>
                                <TableCell sx={{ fontWeight: 600 }}>{player.player.name}</TableCell>
                                {player.statistics.map((statistic) => (
                                    <React.Fragment key={statistic.team.id}>
                                        <TableCell>
                                            <img className="img_mini_logo" src={statistic.team.logo} /> {statistic.team.name}
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>{statistic.goals?.assists}</TableCell>
                                        <TableCell>{statistic.passes?.total}</TableCell>
                                        <TableCell>{statistic.passes?.key}</TableCell>
                                        <TableCell>{statistic.passes?.accuracy}</TableCell>
                                    </React.Fragment>
                                ))}
                            </TableRow>
                        ))}
                    {/* </TableBody> */}
                </Table>
            </TableContainer>
        </Container>
    )
}
