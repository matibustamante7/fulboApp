import { Box, Container, Link, Paper, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLeagues } from '../../redux/actions';
import "../../App.css"
import theme from '../../theme';
export default function ImportantComp() {

    // Premier league 39
    // Serie A 135
    // La Liga 140
    // Bundesliga 78
    // Francia 61
    // Portugal 94
    // Liga Profesional argentina 128
    // Primera nacional 129
    // copa de la liga 483
    // copa argentina 130
    // libertadores 13
    // sudamericana 11
    // champions 2
    // europa league 3

    const idsCompetitions = [39, 135, 140, 61, 94, 128, 129, 483, 130, 13, 11, 2, 3]

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLeagues())
        filterCompetitions();
    }, [])
    const competitions = useSelector((state) => state.allCompetitions);

    const filterCompetitions = () => {

    }

    return (
        <Container>
            <Paper sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', width:'70%',
        backgroundColor:theme.palette.secondary.main,  }}>
                {
                    competitions.map((competition) => {
                        for (let i = 0; i < idsCompetitions.length; i++) {
                            if (competition.league.id === idsCompetitions[i]) {
                                return (
                                    <Box sx={{ display: "flex", width: '100%', mt: 2 }}>

                                        <Link sx={{ padding: '.2rem', display: 'flex', justifyContent: 'space-between' }} href={`/competitions/${competition.league.id}`}>

                                            <img className='img_mini_logo' src={competition.country.flag} />
                                            <Typography 
                                            sx={{color:theme.palette.primary.main, textDecoration:'none',
                                            '&:hover':{
                                                color:theme.palette.success.main,
                                                textDecoration:'underline'
                                            }}}>
                                                {competition.league.name}</Typography>
                                        </Link>

                                    </Box>
                                )
                            }
                        }
                    })
                }
            </Paper>
        </Container>
    )
}
