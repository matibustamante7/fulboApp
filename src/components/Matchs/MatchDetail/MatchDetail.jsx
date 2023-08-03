import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getLineUpsMatchDetail } from "../../../redux/actions";
import { useParams } from "react-router-dom";
import { Box, Container, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import theme from "../../../theme";
import "../../../app.css"
export default function MatchDetail() {
    const { idMatch } = useParams();
    console.log(idMatch);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getLineUpsMatchDetail(idMatch))
    }, [dispatch])

    const matchDetail = useSelector((state) => state.lineUpsByMatch)
    // console.log(matchDetail);
    return (
        <Container maxWidth>
            {
                matchDetail.map((teams) => {
                    // console.log(teams);
                    return (
                        <Container sx={{ gap: 4 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', m: 4, alignItems: "center", backgroundColor: theme.palette.secondary.main, borderRadius: 4, gap:2 }}>

                                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems:'center', p:3 }}>
                                    
                                    <img className="img_cards" src={teams.team.logo} />
                                    <Typography variant="h5">{teams.team.name}</Typography>

                                </Box>

                                <Box>
                                    <Typography variant="h6">Coach: {teams.coach.name}</Typography>
                                    <Typography variant="h6">Line up: {teams.formation}</Typography>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', textAlign: 'center', gap: 3 }}>
                                <TableContainer component={Paper}>
                                    <Typography variant="h5">Initial 11</Typography>

                                    <Table>
                                        <TableHead>
                                            <TableCell sx={{ fontWeight: 600 }}>Position</TableCell>
                                            <TableCell sx={{ fontWeight: 600 }}>Player</TableCell>
                                            <TableCell sx={{ fontWeight: 600 }}>Number</TableCell>
                                        </TableHead>

                                        {
                                            // console.log(teams)
                                            teams?.startXI.map((players) => {
                                                // console.log(players);
                                                return (
                                                    <TableRow>
                                                        <TableCell>{players.player.pos}</TableCell>
                                                        <TableCell>{players.player.name}</TableCell>
                                                        <TableCell>{players.player.number}</TableCell>
                                                    </TableRow>

                                                    // <Typography variant="body">{players.player.name} {players.player.number}</Typography>
                                                )
                                            })
                                        } </Table>
                                </TableContainer>
                                <TableContainer component={Paper}>
                                    <Typography variant="h5">Subtitutes</Typography>
                                    <Table>
                                        <TableHead>
                                            <TableCell sx={{ fontWeight: 600 }}>Position</TableCell>
                                            <TableCell sx={{ fontWeight: 600 }}>Player</TableCell>
                                            <TableCell sx={{ fontWeight: 600 }}>Number</TableCell>
                                        </TableHead>

                                        {
                                            // console.log(teams)
                                            teams?.substitutes?.map((players) => {
                                                // console.log(players);
                                                return (
                                                    <TableRow>
                                                        <TableCell>{players.player.pos}</TableCell>
                                                        <TableCell>{players.player.name}</TableCell>
                                                        <TableCell>{players.player.number}</TableCell>
                                                    </TableRow>

                                                    // <Typography variant="body">{players.player.name} {players.player.number}</Typography>
                                                )
                                            })
                                        } </Table>
                                </TableContainer>
                            </Box>
                            {/* <Box>
                                <Typography variant="h6">Subtitutes</Typography>
                                {
                                    teams.team?.subtitutes.map((subtitute)=>{
                                        return(
                                            <Typography variant="body">{subtitute.player.name} {subtitute.player.number}</Typography>
                                        )
                                    })
                                }
                            </Box> */}
                        </Container>
                    )
                })
            }
        </Container>
    )
}