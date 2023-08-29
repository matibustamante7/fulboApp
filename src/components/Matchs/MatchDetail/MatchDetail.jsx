import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getEventsOnMatchAway, getEventsOnMatchHome, getLineUpsMatchDetail } from "../../../redux/actions";
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
        dispatch(getEventsOnMatchHome(idMatch, idTeamHome))
        dispatch(getEventsOnMatchAway(idMatch, idTeamAway))
    }, [])

    const matchDetail = useSelector((state) => state.lineUpsByMatch)
    const eventsOnTheMatchHome = useSelector((state) => state.eventsOnTheMatchHome)
    const eventsOnTheMatchAway = useSelector((state) => state.eventsOnTheMatchAway)

    let idTeamHome = '';
    let idTeamAway = '';
    matchDetail.map((teams) => {
        idTeamHome = teams.teams.home.id
        idTeamAway = teams.teams.away.id
        // console.log(idTeamAway);
        // console.log(idTeamHome  );
    })

    // eventsOnTheMatchHome.map((event)=>{
    //     console.log("Home " +event.type);
    // })

    // console.log(eventsOnTheMatchHome);
    // console.log("Away "+ eventsOnTheMatchAway);
    return (
        <>
            {matchDetail.length === 0 ?
                <Typography variant="h3" sx={{ textAlign: 'center' }}>Sin datos del encuentro</Typography> :
                matchDetail.map((detailMatch) => {
                    // console.log(detailMatch.goals);
                    // let idTeam = teams.team.id;
                    return (
                        <Grid container columns={12} spacing={1} gap={2} >
                            <Grid item xs={12} sm={12} md={8} lg={6} xl={4} sx={{ margin: 'auto' }}>
                                <Grid container component={Paper} >
                                    <Grid item xs={6} sx={{borderRight:1}}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', borderBottom:1,m:1, gap:2}}>
                                            <img className="img_player" src={detailMatch.teams.home.logo} />
                                            <Typography variant="body">{detailMatch.teams.home.name}</Typography>
                                            <Typography variant="body"><b>{detailMatch.goals?.home ? detailMatch.goals.home : detailMatch.goals.home === 0 ? 0 : detailMatch.goals.home !==0?  '-' : '-'}</b></Typography>
                                        </Box>
                                        <Box  sx={{ display: 'flex',flexDirection:'column',  justifyContent: 'space-evenly', margin:1 }} >
                                            {eventsOnTheMatchHome?.map((event) => {
                                                // console.log(event);
                                                return (
                                                    <>
                                                        {event.type === "Goal" ? (
                                                            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' , borderBottom:1 }}>
                                                                <b>{event.time.elapsed}'</b> {event.player.name}  <SportsSoccerSharpIcon sx={{ width: '12px' }} />;
                                                            </Typography>
                                                        ) : event.type === "Card" ? (
                                                            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', borderBottom:1  }}>
                                                                <b>{event.time.elapsed}'</b> {event.player.name} <SimCardAlertIcon sx={{ width: '12px' }} />;
                                                            </Typography>
                                                        ) : event.type === "subst" ? (
                                                            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', borderBottom:1  }}>
                                                                <b>{event.time.elapsed}'</b> {event.player.name} <CompareArrowsSharpIcon sx={{ width: '12px' }} />
                                                                {event.assist.name};
                                                            </Typography>
                                                        ) : ''}
                                                    </>
                                                );
                                            })}
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6} >
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly',m:1, borderBottom:1, gap:2}}>
                                        <Typography variant="body"><b>{detailMatch.goals?.away ? detailMatch.goals.away : detailMatch.goals.away === 0 ? 0 : detailMatch.goals.away !==0?  '-' : '-'}</b></Typography>
                                            <Typography variant="body">{detailMatch.teams.away.name}</Typography>
                                            <img className="img_player" src={detailMatch.teams.away.logo} />

                                        </Box>
                                        <Box  sx={{ display: 'flex',flexDirection:'column',  justifyContent: 'space-evenly', margin:1 }} >
                                            {eventsOnTheMatchAway?.map((event) => {
                                                // console.log(event);
                                                return (
                                                    <>
                                                        {event.type === "Goal" ? (
                                                            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', borderBottom:1 }}>
                                                                <b>{event.time.elapsed}'</b> {event.player.name}  <SportsSoccerSharpIcon sx={{ width: '12px' }} />;
                                                            </Typography>
                                                        ) : event.type === "Card" ? (
                                                            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', borderBottom:1  }}>
                                                                <b>{event.time.elapsed}'</b> {event.player.name} <SimCardAlertIcon sx={{ width: '12px' }} />;
                                                            </Typography>
                                                        ) : event.type === "subst" ? (
                                                            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', borderBottom:1  }}>
                                                                <b>{event.time.elapsed}'</b> {event.player.name}<CompareArrowsSharpIcon sx={{ width: '12px' }} />{event.assist.name};
                                                            </Typography>
                                                        ) : ''}
                                                    </>
                                                );
                                            })}
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>




                            {
                                detailMatch.lineups?.map((teams) => {
                                    // console.log(teams);
                                    return (
                                        <Grid container columns={12} component={Paper} margin='5px' padding={1}>
                                            <Grid item xs={12} >
                                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                                                    <img className="img_player" src={teams.team.logo} />
                                                    <Typography variant="h5">{teams.team.name}</Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={6} sm={6} md={6} lg={4} xl={4} borderRight={1}>
                                                <TableContainer sx={{ textAlign: 'center', margin: 'auto' }}>
                                                    <Typography variant="h5">Titulares</Typography>

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
                                            <Grid item xs={6} sm={6} md={6} lg={4} xl={4} sx={{ margin: 'auto' }}>
                                                <TableContainer sx={{ textAlign: 'center' }}>
                                                    <Typography variant="h5">Suplentes</Typography>
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
                                                                )})
                                                        } </Table>
                                                </TableContainer>
                                            </Grid>
                                            <Grid item xs={12} md={8} lg={4} sx={{ textAlign: 'center', margin: 'auto' }}>
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
                    )
                })
            }
        </>
    )
}