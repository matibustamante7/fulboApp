import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { Link } from '@mui/material';
import theme from "../../theme";
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getFixtureInlive, getFixtureTodayByCompetition, getLeagues } from '../../redux/actions';
import { useNavigate } from "react-router-dom";



export default function SubHeader() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getLeagues())
    }, [])

    const competitions = useSelector((state) => state.allCompetitions);

    const handleChange = (e) => {
        let idCompetition = e.target.value;
        // console.log(idCompetition);
        dispatch(getFixtureTodayByCompetition(idCompetition));
        dispatch(getFixtureInlive(idCompetition));
    }

    const sortedCompetitions = [...competitions]?.sort((a, b) => {
        // Compara los nombres de liga y país en minúsculas para garantizar una ordenación sin distinción entre mayúsculas y minúsculas
        const nameA = `${a.country.name.toLowerCase()} - ${a.league.name.toLowerCase()}`;
        const nameB = `${b.country.name.toLowerCase()} - ${b.league.name.toLowerCase()}`;
        return nameA.localeCompare(nameB);
    })
    // const navigateComp = (e) => {
    //     navigate('/competitions');
    // }
    // const navigateCountries = (e) => {
    //     navigate('/competitions');
    // }
    return (
        <Grid container fullWidth columns={12} spacing={1} sx={{alignItems: 'center',  backgroundColor:theme.palette.secondary.main}} >
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <Grid container columns={12} spacing={1} >
                    <Grid item xs={6}>
                        <Link href={'/competitions'} sx={{ textDecoration: 'none', color: theme.palette.success.main }}>
                            <Button variant="outlined" sx={{ fontSize: 12, }}>Todas las competiciones</Button>
                        </Link>
                    </Grid>
                    <Grid item xs={6}>
                        <Link href={'/countries'} sx={{ textDecoration: 'none', color: theme.palette.success.main }}>
                            <Button variant="outlined" sx={{ fontSize: 12 }}>Competiciones por pais</Button>
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} sx={{mb:2}}>
                <FormControl fullWidth >
                    <InputLabel id="select-competition">Competiciones</InputLabel>
                    <Select
                        labelId="select-competition"
                        id="demo-simple-select"
                        label="Age"
                        onChange={handleChange}>
                        <MenuItem value="">Alls</MenuItem>
                        {
                            sortedCompetitions?.map((competition, index) => (
                                <MenuItem key={index} value={competition.league.id}>{competition.country.name} - {competition.league.name}</MenuItem>
                            ))
                        }

                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    )
}