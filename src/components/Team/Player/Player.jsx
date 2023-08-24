import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPlayer, getSeasons } from '../../../redux/actions'
import { useParams } from 'react-router-dom'
import { Box, Container, Grid, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import "../../../App.css"
import StarIcon from '@mui/icons-material/Star';
export default function Player() {
    const { idPlayer } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPlayer(idPlayer, season))
        dispatch(getSeasons())
    }, [])
    const seasons = useSelector((state) => state.seasons)
    const dataPlayer = useSelector((state) => state.player)
    // console.log(dataPlayer);
    const season = 2023;
    const handleChangeSeason = (e) => {
        let seasonSelect = e.target.value;
        dispatch(getPlayer(idPlayer, seasonSelect))
    }
    return (
        <>
            {
                dataPlayer.length === 0 ?
                    <Typography variant='h4'>No hay data del jugador</Typography> :
                    dataPlayer.map((player) => {
                        return (
                            <Container>
                                <Box component={Paper} sx={{ p: 3, m: 3 }}>
                                    <Typography variant='h4' sx={{ textAlign: 'center', pb: 3 }}>{player.player.firstname} {player.player.lastname}</Typography>

                                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-evenly' }}>
                                        <Box>
                                            <Typography variant='body1'>Nacimiento: {player.player.birth?.date}</Typography>
                                            <Typography variant='body1'>Lugar: {player.player.birth?.place}</Typography>
                                            <Typography variant='body1'>Nacionalidad: {player.player.nationality}</Typography>
                                            <Typography variant='body1'>Edad: {player.player.age}</Typography>
                                            <Typography variant='body1'>Altura: {player.player.height}</Typography>
                                            <Typography variant='body1'>Peso: {player.player.weight}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                            <img className='img_cards' src={player.player.photo} />
                                        </Box>
                                    </Box>

                                </Box>
                                <Box maxWidth sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
                                    <p>Seleccionar temporada</p>

                                    <select id='select_season' onChange={handleChangeSeason}>
                                        <option defaultValue={season}></option>

                                        {
                                            seasons.map((season) => {
                                                return (
                                                    <option value={season}>{season}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </Box>
                                <Box component={Paper} sx={{ p: 3, m: 3 }}>
                                    {

                                        player?.statistics.map((statis) => {
                                            return (
                                                <>
                                                    <Grid container columns={12} sx={{  p: 1, alignItems: 'center' }}>
                                                        <Grid item xs={6}>
                                                        <Typography variant='body2' >{statis.league.name}</Typography>
                                                        </Grid>
                                                        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'space-around', flexDirection:'column', alignItems: 'center', textAlign:'center' }}>
                                                            <img src={statis.team?.logo} className='img_player' />
                                                            <Typography variant='body2' maxWidth>{statis.team.name}</Typography>
                                                        </Grid>
                                                        {

                                                            // statis.league.flag === null ? '' : <img src={statis.league?.flag} className='img_cards' />
                                                        }
                                                    </Grid>
                                                    <TableContainer>
                                                        <Table>
                                                            <TableHead>
                                                                <TableCell sx={{ fontWeight: 600 }}>Partidos</TableCell>
                                                                <TableCell sx={{ fontWeight: 600 }}>Min</TableCell>
                                                                <TableCell sx={{ fontWeight: 600 }}>Pos</TableCell>
                                                                <TableCell sx={{ fontWeight: 600 }}>Punt</TableCell>
                                                                <TableCell sx={{ fontWeight: 600 }}>Goles</TableCell>
                                                                <TableCell sx={{ fontWeight: 600 }}>Goles concedidos</TableCell>
                                                                <TableCell sx={{ fontWeight: 600 }}>Asistencias</TableCell>
                                                                <TableCell sx={{ fontWeight: 600 }}>Yellow cards</TableCell>
                                                                <TableCell sx={{ fontWeight: 600 }}>Double yelllow cards</TableCell>
                                                                <TableCell sx={{ fontWeight: 600 }}>Red cards</TableCell>
                                                                <TableCell sx={{ fontWeight: 600 }}>Penalty scored</TableCell>
                                                                <TableCell sx={{ fontWeight: 600 }}>Penalty saved</TableCell>
                                                            </TableHead>
                                                            <TableRow>
                                                                <TableCell>{statis.games.appearences ? statis.games.appearences : '-'}</TableCell>
                                                                <TableCell>{statis.games.minutes ? statis.games.minutes : '-'}'</TableCell>
                                                                <TableCell>{statis.games.position ? statis.games.position : '-'}</TableCell>
                                                                <TableCell sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}><StarIcon /> {statis.games.rating ? statis.games.rating : '-'}</TableCell>
                                                                <TableCell>{statis.goals.total ? statis.goals.total : '-'}</TableCell>
                                                                <TableCell>{statis.goals.conceded ? statis.shots.conceded : '-'}</TableCell>
                                                                <TableCell>{statis.goals.assists ? statis.goals.assists : '-'}</TableCell> 
                                                                <TableCell>{statis.cards.yellow ? statis.cards.yellow : '-'}</TableCell>
                                                                <TableCell>{statis.cards.yellowred ? statis.cards.yellowred : '-'}</TableCell>
                                                                <TableCell>{statis.cards.red ? statis.cards.red : '-'}</TableCell>
                                                                <TableCell>{statis.penalty.scored ? statis.penalty.scored : '-'}</TableCell>
                                                                <TableCell>{statis.penalty?.saved ? statis.penalty?.saved : '-'}</TableCell>
                                                            </TableRow>
                                                        </Table>
                                                    </TableContainer>
                                                </>
                                            )
                                        })
                                    }
                                </Box>
                            </Container>
                        )
                    })
            }
        </>
    )
}
