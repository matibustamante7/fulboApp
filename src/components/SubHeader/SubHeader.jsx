import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from '@mui/material';
import theme from "../../theme";
import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getFixtureInlive, getFixtureTodayByCompetition, getLeagues } from '../../redux/actions';
import ImportantComp from "../ImportantComp/ImportantComp";



export default function SubHeader() {
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLeagues())
    },[])

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
    return (
        <Container maxWidth sx={{display:'flex', alignItems:'center', justifyContent:'space-evenly', margin:'4rem'}}>

            <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-around', gap:'3rem'}}>
                
                <Link href={'/competitions'} sx={{textDecoration:'none',  color:theme.palette.success.main}}>
                    <Button variant="contained">Competitions</Button>
                </Link>
                <Link href={'/countries'} sx={{textDecoration:'none',  color:theme.palette.success.main}}>
                    <Button variant="contained">Countries</Button>
                </Link>
            </Box>
            <Box sx={{ minWidth: 120, width:'20rem' }}>
                <FormControl fullWidth>

                    <select onChange={handleChange}>
                        <option value="">Alls</option>
                        {
                            sortedCompetitions?.map((competition, index) => (
                                <option key={index} value={competition.league.id}>{competition.country.name} - {competition.league.name}</option>
                            ))
                        }

                    </select>
                </FormControl>
            </Box>
        </Container>
    )
}