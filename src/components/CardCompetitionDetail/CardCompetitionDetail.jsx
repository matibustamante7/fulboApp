import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { filterCompByCountry, getAssistsCompetition, getCompetitionById, getFixtureByCompetition, getScorersCompetition, getTableCompetition, handleChangeCompetition } from "../../redux/actions";
import { Box, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import './CardCompetitionDetail.css'
import { all } from "axios";
import Scorer from "../Stadistics/Scorer/Scorer";
import Assists from "../Stadistics/Assists/Assists";

export default function CardCompetitionDetail() {
    const { idCompetition } = useParams()
    const dispatch = useDispatch();
    // console.log(nameCompetition);

    useEffect(() => {
        dispatch(getTableCompetition(idCompetition))
        dispatch(getFixtureByCompetition(idCompetition))
        
    }, [dispatch])

    const competition = useSelector((state) => state.tableCompetition)
    //agregar filtro para cambiar competiciones con un select
    const allCompetitions = useSelector((state) => state.allCompetitions)
    // console.log(allCompetitions);
    const fixture = useSelector((state) => state.fixtureByCompetition)
    // console.log(fixture);


    const handleFilterByCountry = (e) => {
        let competitionId = e.target.value;
        dispatch(handleChangeCompetition(competitionId));
        dispatch(getTableCompetition(competitionId))
        dispatch(getFixtureByCompetition(competitionId))
        dispatch(getScorersCompetition(competitionId))
        dispatch(getAssistsCompetition(competitionId))
        // console.log(`cambie la competicioon a ${competitionId}`);
    };
    return (

        <>

            {
                competition.map((comp) => {
                    return (
                        <Container maxWidth='xl' margin='auto'>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <img className="logo_title" src={comp.league.logo} />
                                </Box>
                                <Typography variant="h3" sx={{ fontWeight: 600 }}>{comp.league.name}</Typography>

                            </Box>
                            <select onChange={handleFilterByCountry}>
                                <option value="">Alls</option>
                                {allCompetitions.map((competition, index) => (
                                    <option key={index} value={competition.league.id}>{competition.league.name} - {competition.country.name}</option>
                                    // <option>hola</option>
                                ))}
                            </select>
                            {/* {console.log(comp.league)} */}
                            <Box maxWidth='110%' sx={{ display: 'flex', gap: 2, mt: 2 }}>
                                {/* tabla de posiciones */}
                                <TableContainer component={Paper} sx={{ width: '70%' }} >
                                    <Table>
                                        <TableHead>
                                            <TableCell sx={{ fontWeight: 600 }}>Position</TableCell>
                                            <TableCell sx={{ fontWeight: 600 }}>Team</TableCell>
                                            <TableCell sx={{ fontWeight: 600 }}>Points</TableCell>
                                            <TableCell sx={{ fontWeight: 600 }}>MP</TableCell>
                                            <TableCell sx={{ fontWeight: 600 }}>W</TableCell>
                                            <TableCell sx={{ fontWeight: 600 }}>D</TableCell>
                                            <TableCell sx={{ fontWeight: 600 }}>L</TableCell>
                                            <TableCell sx={{ fontWeight: 600 }}>Ratio goals</TableCell>
                                        </TableHead>
                                        {/* el contenido de la tabla va mapeado, este es hardcodeado*/}
                                        {
                                            comp.league.standings[0].map((teams) => {
                                                // teams.map((team) => {
                                                // console.log(teams);
                                                return (
                                                    <TableRow>
                                                        {/* posicion */}
                                                        <TableCell sx={{ fontWeight: 600 }}>{teams.rank}</TableCell>
                                                        {/* equipo */}
                                                        <TableCell><img className="img_mini_logo" src={teams.team.logo}></img> {teams.team.name}</TableCell>
                                                        {/* puntos */}
                                                        <TableCell>{teams.points}</TableCell>
                                                        {/* partidos jugados */}
                                                        <TableCell>{teams.all.played}</TableCell>
                                                        {/* partidos ganados */}
                                                        <TableCell>{teams.all.win}</TableCell>
                                                        {/* partidos empatados */}
                                                        <TableCell>{teams.all.draw}</TableCell>
                                                        {/* partidos perdidos */}
                                                        <TableCell>{teams.all.lose}</TableCell>
                                                        {/* ratio de goles a favor y contra */}
                                                        <TableCell>{teams.all.goals.for}:{teams.all.goals.against}</TableCell>
                                                        {/* ultimos partidos */}
                                                    </TableRow>
                                                )
                                            })

                                        }

                                    </Table>
                                </TableContainer>
                                {/* tabla de fixture resultados */}
                                <TableContainer component={Paper} sx={{ display: 'flex', flexDirection: 'row', width: '30%', flexShrink: 0 }}>
                                    {/* <Table>
                                        <TableBody>
                                            {fixture?.map((partido, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{partido.league.round}</TableCell>
                                                    <TableCell sx={{ textAlign: 'right' }}>{partido.teams.home.name} <img className="img_mini_logo" src={partido.teams.home.logo} /></TableCell>
                                                    <TableCell sx={{ textAlign: 'center' }}>{partido.goals.home}</TableCell>
                                                    <TableCell sx={{ textAlign: 'center' }}>{partido.goals.away}</TableCell>
                                                    <TableCell sx={{ textAlign: 'left' }}><img className="img_mini_logo" src={partido.teams.away.logo} /> {partido.teams.away.name}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table> */}
                                </TableContainer>
                            </Box>
                            <Box sx={{display:'flex', justifyContent:'space-between', gap:2}}>
                                <Scorer idCompetition={idCompetition}/>
                                <Assists idCompetition={idCompetition}/>
                            </Box>
                        </Container>
                    )
                })
            }</>
    )
}
