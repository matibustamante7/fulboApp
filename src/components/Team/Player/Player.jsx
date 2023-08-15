import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPlayer, getSeasons } from '../../../redux/actions'
import { useParams } from 'react-router-dom'
import { Box, Container, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import "../../../App.css"
import StarIcon from '@mui/icons-material/Star';
export default function Player() {
    const { idPlayer } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPlayer(idPlayer, season))
        dispatch(getSeasons())
    }, [])
    const seasons = useSelector((state)=> state.seasons)
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
                    <Typography variant='h4'>No data in this season</Typography> :
                    dataPlayer.map((player) => {
                        console.log(player.statistics);
                        return (
                            <Container>
                                <Box component={Paper} sx={{ p: 3, m: 3 }}>
                                    <Typography variant='h3' sx={{ textAlign: 'center', pb: 3 }}>{player.player.firstname} {player.player.lastname}</Typography>

                                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-evenly' }}>
                                        <Box>
                                            <Typography variant='body1'>Birthday: {player.player.brith?.date}</Typography>
                                            <Typography variant='body1'>Place: {player.player.brith?.place}</Typography>
                                            <Typography variant='body1'>Nationality: {player.player.nationality}</Typography>
                                            <Typography variant='body1'>Age: {player.player.age}</Typography>
                                            <Typography variant='body1'>Height: {player.player.height}</Typography>
                                            <Typography variant='body1'>Weight: {player.player.weight}</Typography>
                                        </Box>
                                        <Box>
                                            <img src={player.player.photo} />
                                        </Box>
                                    </Box>

                                </Box>
                                <Box  maxWidth sx={{display:'flex', alignItems:'center', justifyContent:'center', gap:3}}>
                                <p>Select season</p>

                                    <select id='select_season' onChange={handleChangeSeason}>
                                        <option defaultValue={season}></option>

                                        {
                                            seasons.map((season)=>{
                                                return(
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
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 3, alignItems: 'center' }}>
                                                        <Typography variant='h6'>{statis.league.name}</Typography>
                                                        <Typography variant='h6'>{statis.team.name}</Typography>
                                                        <img src={statis.team?.logo} className='img_cards' />
                                                        {

                                                            // statis.league.flag === null ? '' : <img src={statis.league?.flag} className='img_cards' />
                                                        }
                                                    </Box>
                                                    <TableContainer>
                                                        <Table>
                                                            <TableHead>
                                                                <TableCell sx={{ fontWeight: 600 }}>Appearences</TableCell>
                                                                <TableCell sx={{ fontWeight: 600 }}>Minutes</TableCell>
                                                                <TableCell sx={{ fontWeight: 600 }}>Position</TableCell>
                                                                <TableCell sx={{ fontWeight: 600 }}>Rating</TableCell>
                                                                <TableCell sx={{ fontWeight: 600 }}>Goals</TableCell>
                                                                <TableCell sx={{ fontWeight: 600 }}>Goals conceded</TableCell>
                                                                <TableCell sx={{ fontWeight: 600 }}>Shots total</TableCell>
                                                                <TableCell sx={{ fontWeight: 600 }}>Shots on target</TableCell>
                                                                <TableCell sx={{ fontWeight: 600 }}>Assists</TableCell>
                                                                <TableCell sx={{ fontWeight: 600 }}>Passes total</TableCell>
                                                                <TableCell sx={{ fontWeight: 600 }}>Passes key</TableCell>
                                                                <TableCell sx={{ fontWeight: 600 }}>Passes accuracy</TableCell>
                                                                <TableCell sx={{ fontWeight: 600 }}>Tackles total</TableCell>
                                                                <TableCell sx={{ fontWeight: 600 }}>Duels total</TableCell>
                                                                <TableCell sx={{ fontWeight: 600 }}>Duels won</TableCell>
                                                                <TableCell sx={{ fontWeight: 600 }}>Dribbles attempts</TableCell>
                                                                <TableCell sx={{ fontWeight: 600 }}>Dribbles success</TableCell>
                                                                <TableCell sx={{ fontWeight: 600 }}>Fouls drawn</TableCell>
                                                                <TableCell sx={{ fontWeight: 600 }}>Fouls committed</TableCell>
                                                                <TableCell sx={{ fontWeight: 600 }}>Yellow cards</TableCell>
                                                                <TableCell sx={{ fontWeight: 600 }}>Double yelllow cards</TableCell>
                                                                <TableCell sx={{ fontWeight: 600 }}>Red cards</TableCell>
                                                                <TableCell sx={{ fontWeight: 600 }}>Penalty won</TableCell>
                                                                <TableCell sx={{ fontWeight: 600 }}>Penalty commited</TableCell>
                                                                <TableCell sx={{ fontWeight: 600 }}>Penalty scored</TableCell>
                                                                <TableCell sx={{ fontWeight: 600 }}>Penalty missed</TableCell>
                                                                <TableCell sx={{ fontWeight: 600 }}>Penalty saved</TableCell>
                                                            </TableHead>
                                                            <TableRow>
                                                                <TableCell>{statis.games.appearences ? statis.games.appearences : '-'}</TableCell>
                                                                <TableCell>{statis.games.minutes ? statis.games.minutes : '-'}'</TableCell>
                                                                <TableCell>{statis.games.position ? statis.games.position : '-'}</TableCell>
                                                                <TableCell sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}><StarIcon /> {statis.games.rating ? statis.games.rating : '-'}</TableCell>
                                                                <TableCell>{statis.goals.total ? statis.goals.total : '-'}</TableCell>
                                                                <TableCell>{statis.goals.conceded ? statis.shots.conceded : '-'}</TableCell>
                                                                <TableCell>{statis.shots.total ? statis.shots.total : '-'}</TableCell>
                                                                <TableCell>{statis.shots.on ? statis.shots.on : '-'}</TableCell>
                                                                <TableCell>{statis.goals.assists ? statis.goals.assists : '-'}</TableCell>
                                                                <TableCell>{statis.passes.total ? statis.passes.total : '-'}</TableCell>
                                                                <TableCell>{statis.passes.key ? statis.passes.key : '-'}</TableCell>
                                                                <TableCell>{statis.passes.accuracy ? statis.passes.accuracy : '-'}</TableCell>
                                                                <TableCell>{statis.duels.total ? statis.duels.total : '-'}</TableCell>
                                                                <TableCell>{statis.duels.won ? statis.duels.won : '-'}</TableCell>
                                                                <TableCell>{statis.dribbles.attempts ? statis.dribbles.attempts : '-'}</TableCell>
                                                                <TableCell>{statis.dribbles.success ? statis.dribbles.success : '-'}</TableCell>
                                                                <TableCell>{statis.fouls.drawn ? statis.fouls.drawn : '-'}</TableCell>
                                                                <TableCell>{statis.fouls.committed ? statis.fouls.committed : '-'}</TableCell>
                                                                <TableCell>{statis.cards.yellow ? statis.cards.yellow : '-'}</TableCell>
                                                                <TableCell>{statis.cards.yellowred ? statis.cards.yellowred : '-'}</TableCell>
                                                                <TableCell>{statis.cards.red ? statis.cards.red : '-'}</TableCell>
                                                                <TableCell>{statis.penalty.won ? statis.penalty.won : '-'}</TableCell>
                                                                <TableCell>{statis.penalty.committed ? statis.penalty.committed : '-'}</TableCell>
                                                                <TableCell>{statis.penalty.scored ? statis.penalty.scored : '-'}</TableCell>
                                                                <TableCell>{statis.penalty.missed ? statis.penalty.missed : '-'}</TableCell>
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
