import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPlayer } from '../../../redux/actions'
import { useParams } from 'react-router-dom'
import { Box, Container, Paper, Table, TableContainer, TableHead, Typography } from '@mui/material'
import "../../../App.css"
export default function Player() {
    const { idPlayer } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPlayer(idPlayer, season))
    }, [])
    const season = 2020
    const dataPlayer = useSelector((state) => state.player)
    console.log(dataPlayer);
    return (
        <Container>
            {
                dataPlayer?.map((player) => {
                    console.log(player.statistics);
                    return (
                        <>
                            <Box component={Paper} sx>
                                <Typography variant='h3' sx={{ textAlign: 'center' }}>{player.player.firstname} {player.player.lastname}</Typography>

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
                            <Box component={Paper}>
                                {
                                    player?.statistics.map((statis) => {
                                        return (
                                            <>
                                            <Box sx={{display:'flex', justifyContent:'space-evenly'}}>
                                                <Typography>{statis.team.name}</Typography>
                                                <img src={statis.team.logo} className='img_cards'/>
                                                <img src={statis.league.flag} className='img_cards'/>
                                            </Box>
                                            <TableContainer>
                                                <Table>
                                                    <TableHead>

                                                    </TableHead>
                                                </Table>
                                            </TableContainer>
                                            </>
                                        )
                                    })
                                }
                            </Box>
                        </>
                    )
                })
            }
        </Container>
    )
}
