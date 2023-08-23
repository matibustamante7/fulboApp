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
    // matchDetail.map((teams) => {
    //     idTeam = teams.team.id;
    // })
    const eventsMatch = useSelector((state) => state.eventsOnTheMatch)
    // console.log(eventsMatch);
    return (
        <>
            {matchDetail.length === 0 ?
                <Typography variant="h3" sx={{ textAlign: 'center' }}>No match data yet</Typography> :
                matchDetail.map((detailMatch) => {
                    // console.log(detailMatch);
                    // let idTeam = teams.team.id;
                    return (
                        <Grid container columns={12} spacing={1} gap={2} >
                            <Grid item xs={12} sm={12} md={6}>
                                <Grid container component={Paper} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                    <Grid item xs={6} sx={{ display: "flex", justifyContent: 'space-evenly', alignItems: 'center', borderRight: 1, gap: 2 }}>

                                        <img className="img_player" src={detailMatch.teams.home.logo} />
                                        <Typography variant="body">{detailMatch.teams.home.name}</Typography>

                                        <Typography variant="body">{detailMatch.goals.home}</Typography>
                                    </Grid>
                                    <Grid item xs={6} sx={{ display: "flex", justifyContent: 'space-evenly', alignItems: 'center', gap: 2 }}>
                                        <Typography variant="body">{detailMatch.goals.away}</Typography>

                                        <Typography variant="body">{detailMatch.teams.away.name}</Typography>
                                        <img className="img_player" src={detailMatch.teams.away.logo} />

                                    </Grid>
                                </Grid>
                            </Grid>




                            {
                                detailMatch.lineups?.map((teams) => {
                                    console.log(teams);
                                    return (
                                        <Grid container columns={12} component={Paper} gap={2}>
                                            <Grid item xs={12} >
                                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                                                    <img className="img_cards" src={teams.team.logo} />
                                                    <Typography variant="h5">{teams.team.name}</Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item>
                                                <TableContainer component={Paper} sx={{ textAlign: 'center', }}>
                                                    <Typography variant="h5">Initial 11</Typography>

                                                    <Table>
                                                        <TableHead>
                                                            <TableCell sx={{ fontWeight: 600, m: 1, p: 1 }}>Pos</TableCell>
                                                            <TableCell sx={{ fontWeight: 600, m: 1, p: 1 }}>Name</TableCell>
                                                            <TableCell sx={{ fontWeight: 600, m: 1, p: 1 }}>N</TableCell>
                                                        </TableHead>
                                                        {
                                                            // console.log(teams)
                                                            teams?.startXI.map((players) => {
                                                                // console.log(players);
                                                                return (
                                                                    <TableRow>
                                                                        <TableCell sx={{ m: 1, p: 1 }}>{players.player.pos}</TableCell>
                                                                        <TableCell sx={{ m: 1, p: 1 }}>{players.player.name}</TableCell>
                                                                        <TableCell sx={{ m: 1, p: 1 }}>{players.player.number}</TableCell>
                                                                    </TableRow>

                                                                )
                                                            })
                                                        }
                                                    </Table>
                                                </TableContainer>
                                            </Grid>
                                            <Grid item>
                                                <TableContainer component={Paper} sx={{ textAlign: 'center' }}>
                                                    <Typography variant="h5">Subtitutes</Typography>
                                                    <Table>
                                                        <TableHead>
                                                            <TableCell sx={{ fontWeight: 600, m: 1, p: 1 }}>Pos</TableCell>
                                                            <TableCell sx={{ fontWeight: 600, m: 1, p: 1 }}>Name</TableCell>
                                                            <TableCell sx={{ fontWeight: 600, m: 1, p: 1 }}>N</TableCell>
                                                        </TableHead>

                                                        {
                                                            // console.log(teams)
                                                            teams?.substitutes?.map((players) => {
                                                                // console.log(players);
                                                                return (
                                                                    <TableRow>
                                                                        <TableCell sx={{ m: 1, p: 1 }}>{players.player.pos}</TableCell>
                                                                        <TableCell sx={{ m: 1, p: 1 }}>{players.player.name}</TableCell>
                                                                        <TableCell sx={{ m: 1, p: 1 }}>{players.player.number}</TableCell>
                                                                    </TableRow>
                                                                )
                                                            })
                                                        } </Table>
                                                </TableContainer>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="h6">Line up: {teams.formation}</Typography>

                                                <div className={styles['field-background']}>
                                                    {/* Jugadores */}

                                                    {teams?.startXI.map((player) => {
                                                        const gridCoordinates = player.player.grid.split(":");
                                                        const row = parseInt(gridCoordinates[0]);
                                                        const col = parseInt(gridCoordinates[1]);
                                                        // console.log(teams);
                                                        return (
                                                            <>
                                                                <div key={player.player.id}
                                                                    className={styles['player']}
                                                                    style={{
                                                                        gridArea: `${col} / ${row}`, // Usar gridArea en lugar de alig
                                                                    }}
                                                                >{player.player.number}
                                                                </div>
                                                            </>

                                                        );
                                                    })}
                                                </div>
                                            </Grid>
                                        </Grid>

                                    )
                                })
                            }

                        </Grid >

                        //         

                        //         {/* formacion */}
                        //         <Grid item xs={12} sm={6} md={4} sx={{textAlign:'center',mt:2, mb:2}} >
                        //         <Typography variant="h6">Line up: {teams.formation}</Typography>

                        //             <div className={styles['field-background']}>
                        //                 {/* Jugadores */}

                        //                 {teams?.startXI.map((player) => {
                        //                     const gridCoordinates = player.player.grid.split(":");
                        //                     const row = parseInt(gridCoordinates[0]);
                        //                     const col = parseInt(gridCoordinates[1]);
                        //                     // console.log(teams);
                        //                     return (
                        //                         <>
                        //                         <div key={player.player.id}
                        //                             className={styles['player']}
                        //                             style={{
                        //                                 gridArea: `${col} / ${row}`, // Usar gridArea en lugar de alig
                        //                                 alignContent:'center'
                        //                             }}
                        //                         >{player.player.number}
                        //                         </div>
                        //                         </>

                        //                     );
                        //                 })}
                        //             </div>


                        //             {
                        //                 eventsMatch.length === 0 ? '' :
                        //                     eventsMatch.map((event) => {
                        //                         console.log(eventsMatch)
                        //                         if (event.team.id === idTeam) {
                        //                             return (
                        //                                 <Box component={Paper} sx={{ width: '100%', textAlign: 'center' }}>
                        //                                     <Typography>incidencias</Typography>
                        //                                     <Box sx={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'center', }}>
                        //                                         <p>{event.time.elapsed}'</p> <p> {event.player.name}</p>
                        //                                         <p>{event.type === 'subst' ? <CompareArrowsSharpIcon /> : 
                        //                                             event.type === 'Goal' ? <SportsSoccerSharpIcon /> : 
                        //                                             event.type === "Card" ? <SimCardAlertIcon /> : event.type}</p>
                        //                                         <p>{event.assist.name}</p>
                        //                                     </Box>
                        //                                 </Box>
                        //                             )
                        //                         }
                        //                     })
                        //             }
                        //         </Grid>
                        //     </Grid>
                        // </Grid>
                    )
                })
            }
        </>
    )
}