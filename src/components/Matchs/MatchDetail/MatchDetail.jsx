import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getEventsOnMatch, getLineUpsMatchDetail } from "../../../redux/actions";
import { useParams } from "react-router-dom";
import { Box, Container, Grid, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import theme from "../../../theme";
import "../../../App.css"
import styles from "./styles.module.css"
import SportsSoccerSharpIcon from '@mui/icons-material/SportsSoccerSharp';
import CompareArrowsSharpIcon from '@mui/icons-material/CompareArrowsSharp';
import SimCardAlertIcon from '@mui/icons-material/SimCardAlert';
export default function MatchDetail() {
    const { idMatch } = useParams();
    // console.log(idMatch);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getLineUpsMatchDetail(idMatch))
        dispatch(getEventsOnMatch(idMatch, idTeam))
    }, [dispatch])

    const matchDetail = useSelector((state) => state.lineUpsByMatch)
    let idTeam = '';
    matchDetail.map((teams) => {
        idTeam = teams.team.id;
    })
    const eventsMatch = useSelector((state) => state.eventsOnTheMatch)
    console.log(eventsMatch);
    return (
        <Container maxWidth>
            {
                matchDetail.map((teams) => {
                    // console.log(teams.team.id);
                    // let idTeam = teams.team.id;
                    return (
                        <Container sx={{ gap: 4 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', m: 4, alignItems: "center", backgroundColor: theme.palette.secondary.main, borderRadius: 4, gap: 2 }}>

                                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', p: 3 }}>

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

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                                    <div className={styles['field-background']}>
                                        {/* Representación del campo de fútbol */}
                                        {/* Puedes poner aquí una imagen del campo de fútbol o dibujar el campo usando divs y CSS */}


                                        {/* Jugadores */}
                                        {teams?.startXI.map((player) => {
                                            const gridCoordinates = player.player.grid.split(":");
                                            const row = parseInt(gridCoordinates[0]);
                                            const col = parseInt(gridCoordinates[1]);

                                            return (
                                                <div key={player.player.id}
                                                    className={styles['player']}
                                                    style={{ gridRow: row, gridColumn: col }}>
                                                    {/* Coloca aquí el contenido del jugador */}
                                                    <p>{player.player.number}</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <Box component={Paper} sx={{width:'100%', textAlign:'center'}}>
                                        <Typography>incidencias</Typography>
                                            {
                                                eventsMatch.map((event) => {
                                                    if (event.team.id===idTeam) {
                                                        return(
                                                            <Box sx={{display:'flex', flexWrap:'nowrap', justifyContent:'center', }}>
                                                                <p>{event.time.elapsed}'</p> <p> {event.player.name}</p> 
                                                                <p>{event.type==='subst' ? <CompareArrowsSharpIcon/> : event.type==='Goal'? <SportsSoccerSharpIcon/>: event.type==="Card" ? <SimCardAlertIcon/>: event.type}</p>
                                                                <p>{event.assist.name}</p>
                                                            </Box>
                                                        )
                                                    }
                                                })
                                            }
                                    </Box>
                                </Box>

                            </Box>
                        </Container>
                    )
                })
            }
        </Container>
    )
}