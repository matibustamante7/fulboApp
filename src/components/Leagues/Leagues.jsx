import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLeagues } from "../../redux/actions"
import { Box, CircularProgress, Container, Grid, Typography } from "@mui/material";
import CardCompetition from "../CardCompetition/CardCompetition";

export default function Leagues() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getLeagues());
    }, []);

    const allLeagues = useSelector((state) => state.searchResults.length > 0 ? state.searchResults : state.allCompetitions);

    return (
        <Container sx={{ mt: 10 }}>
            <Typography variant="h4" sx={{ textAlign: 'center', m: 4 }}>Competiciones</Typography>
            <Grid container columns={12} spacing={1}>
                {
                    allLeagues.length === 0 ? (
                        <Box xs={12} sx={{display:'flex', justifyContent:'center', alignItems:'center', margin:'auto'}}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        allLeagues.map((competitions) => (
                            <Grid item xs={12} sm={6} md={4} lg={3}>

                                <CardCompetition competitions={competitions} />
                            </Grid>
                        )))}
            </Grid>
        </Container>
    );
}