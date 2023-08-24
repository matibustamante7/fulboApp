import { Box, Container, Link, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getTeamSquad, getTeamStadium } from '../../redux/actions'
import "../../App.css"
export default function Team() {
    const { idCompetition, nameTeam, idTeam } = useParams()
    // console.log(nameTeam, idTeam);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTeamSquad(idTeam))
        dispatch(getTeamStadium(idTeam))
        // dispatch(getTeamStadistics(idCompetition, idTeam))
        // dispatch(getCoachByTeam(idTeam))
    }, [])
    const teamSquad = useSelector((state) => state.teamSquad);
    const teamStadium = useSelector((state) => state.teamStadium);
    // const teamStadistics = useSelector((state) => state.teamStadistics);
    // const teamCoach = useSelector((state) => state.teamCoach)
    // console.log(teamCoach);
    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

            {
                teamSquad.leghth === 0 ? (
                    <Typography>No existen datos de ${nameTeam} para mostrar</Typography>
                ) : (
                    teamSquad?.map((team) => {
                        return (
                            <Box component={Paper} sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', padding:'1rem' }}>
                                    <Typography variant='h4'>{team.team.name}</Typography>
                                    <img className='img_cards' src={team.team.logo} alt={team.team.name} />
                                </Box>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableCell sx={{ fontWeight: 600, m:1, p:1 }}> </TableCell>
                                            <TableCell sx={{ fontWeight: 600, m:1, p:1 }}>Jugador</TableCell>
                                            <TableCell sx={{ fontWeight: 600, m:1, p:1 }}>Pos</TableCell>
                                            <TableCell sx={{ fontWeight: 600, m:1, p:1 }}>Num</TableCell>
                                            <TableCell sx={{ fontWeight: 600, m:1, p:1 }}>Edad</TableCell>
                                        </TableHead>
                                        {
                                            team.players.map((player) => {
                                                return (
                                                    <TableRow>
                                                        <TableCell sx={{m:1, p:1}}><img img className="img_player" src={player.photo} /></TableCell>
                                                        <TableCell sx={{m:1, p:1}}>
                                                            <Link href={`/${idCompetition}/${nameTeam}/${idTeam}/${player.id}`}>
                                                                {player.name}
                                                            </Link>
                                                        </TableCell>
                                                        <TableCell sx={{m:1, p:1}}>{player.position}</TableCell>
                                                        <TableCell sx={{m:1, p:1}}>{player.number ? player.number : '-'}</TableCell>
                                                        <TableCell sx={{m:1, p:1}}>{player.age ? player.age : '-'}</TableCell>
                                                    </TableRow>
                                                )
                                            })
                                        }
                                    </Table>
                                </TableContainer>
                            </Box>
                        )
                    })
                )}

            
                {
                    teamStadium.map((stadium) => {
                        return (
                            <Box component={Paper} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', mt: 10, mb: 10, p: 2, gap: 4, textAlign:'center' }}>
                                <Typography variant='h4'>Estadio: <b>{stadium.venue.name}</b></Typography>
                                <Typography variant='h5'>Capacidad: <b>{stadium.venue.capacity}</b></Typography>
                                <img className='img_stadium' src={stadium.venue.image} alt={stadium.venue.name} />
                                <Typography variant='h5'>Ciudad: <b>{stadium.venue.city}</b></Typography>
                                <Typography variant='h5'>Pais: <b>{stadium.team.country}</b></Typography>
                                <Typography variant='h5'>Calle: <b>{stadium.venue.address}</b></Typography>
                            </Box>
                        )
                    })
                }
            
        </Container>
    )
}
