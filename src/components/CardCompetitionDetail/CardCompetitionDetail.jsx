import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useHistory } from "react-router-dom"
import { filterCompByCountry, getAssistsCompetition, getCompetitionById, getCups, getFixtureByCompetition, getFixtureByCompetitionAllRounds, getScorersCompetition, getTableCompetition, handleChangeCompetition } from "../../redux/actions";
import { Box, CircularProgress, Container, Grid, Link, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import './CardCompetitionDetail.css'
import { all } from "axios";
import Scorer from "../Stadistics/Scorer/Scorer";
import Assists from "../Stadistics/Assists/Assists";
import LinearProgress from '@mui/material/LinearProgress';
import theme from "../../theme";
import TouchAppIcon from '@mui/icons-material/TouchApp';


export default function CardCompetitionDetail() {
    const { idCompetition } = useParams()
    const dispatch = useDispatch();
    // console.log(nameCompetition);
    const competition = useSelector((state) => state.tableCompetition)
    // console.log(competition);
    //agregar filtro para cambiar competiciones con un select
    const allCompetitions = useSelector((state) => state.allCompetitions)
    // console.log(allCompetitions);
    const fixture = useSelector((state) => state.fixtureByCompetition)
    // console.log(fixture);
    const allRoundsFixture = useSelector((state) => state.fixtureCompetitionAllRounds)
    // console.log(allRoundsFixture); 
    const [selectedRound, setSelectedRound] = useState("");
    //loader
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    let numRound;
    fixture?.forEach((partido) => {
        numRound = partido.league.round;
    });
    // console.log(fixture);

    const handleRoundChange = (e) => {
        const selectedRoundValue = e.target.value;
        setSelectedRound(selectedRoundValue);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 3000)
        // handleFindCompByTypeCupById();
        dispatch(handleChangeCompetition(idCompetition));
        dispatch(getTableCompetition(idCompetition))
        dispatch(getFixtureByCompetitionAllRounds(idCompetition))
        dispatch(getFixtureByCompetition({ idCompetition, numRound: selectedRound }))
        // dispatch(getScorersCompetition(idCompetition))
        // dispatch(getAssistsCompetition(idCompetition))
        return () => clearTimeout(timer);
    }, [dispatch, idCompetition, selectedRound])

    // const arrCups = []
    // const handleFindCompByTypeCupById = ()=>{
    //     allCompetitions.forEach((compe)=>{
    //         if (compe.league.type==='Cup') {
    //             arrCups.push(compe.league)
    //         }
    //     })
    //     competition = arrCups;
    // }

    const handleFilterByCountry = (e) => {
        let competitionId = e.target.value;
        // Obtener la ubicación actual
        const location = navigate();
        // Crear una nueva ubicación con el parámetro reemplazado
        const newLocation = { ...location, pathname: `/competitions/${competitionId}` };
        // Reemplazar la URL sin agregar una nueva entrada en el historial
        navigate(newLocation, { replace: true });
        dispatch(handleChangeCompetition(competitionId));
        dispatch(getTableCompetition(competitionId))
        dispatch(getFixtureByCompetitionAllRounds(idCompetition))
        dispatch(getFixtureByCompetition({ competitionId, numRound }))
        dispatch(getScorersCompetition(competitionId))
        dispatch(getAssistsCompetition(competitionId))
        console.log(`cambie la competicioon a ${competitionId}`);
    };

    const uniqueRounds = new Set();

    // Filtramos y guardamos solo las rondas únicas en el conjunto
    allRoundsFixture?.forEach((round) => {
        uniqueRounds.add(round.league.round);
    });

    const sortedCompetitions = [...allCompetitions]?.sort((a, b) => {
        // Compara los nombres de liga y país en minúsculas para garantizar una ordenación sin distinción entre mayúsculas y minúsculas
        const nameA = `${a.country.name.toLowerCase()} - ${a.league.name.toLowerCase()}`;
        const nameB = `${b.country.name.toLowerCase()} - ${b.league.name.toLowerCase()}`;
        return nameA.localeCompare(nameB);
    })

    // console.log(competition);

    return (

        <>
        {competition.length === 0 ? (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        ) : (
            
            
                competition?.map((comp) => {
                    return (
                        <Container  margin='auto'>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <img className="logo_title" src={comp.league.logo} />
                                </Box>
                                <Typography variant="h4" sx={{ fontWeight: 600, textAlign:'center' }}>{comp.league.name}</Typography>

                            </Box>

                            {/* {console.log(comp.league)} */}
                            <Grid container columns={12} spacing={1}>

                                <Grid item xs={12} sx={{mt:2}}>
                                    <select onChange={handleFilterByCountry} label='Competitions'>
                                        <option value="">Alls</option>
                                        {sortedCompetitions.map((competition, index) => (
                                            <option key={index} value={competition.league.id}>{competition.country.name} - {competition.league.name}</option>
                                            // <option>hola</option>
                                        ))}
                                    </select>
                                    <Grid item xs={12} >
                                        <Grid container columns={12} spacing={2}>
                                            {
                                                comp.league.standings.length > 1 ? (
                                                    comp.league.standings.map((group) => {
                                                        // console.log();
                                                        return (
                                                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                                                                <Typography variant="h6">{group[0].group}</Typography>

                                                                <Table component={Paper} sx={{ border:1, borderColor:theme.palette.background.default}}>

                                                                    <TableHead sx={{backgroundColor:theme.palette.menu.primary }}>
                                                                        <TableCell sx={{ fontWeight: 600, p: 1, m: 0,color:theme.palette.background.default }}>Pos</TableCell>
                                                                        <TableCell sx={{ fontWeight: 600, p: 1, m: 0 ,color:theme.palette.background.default}}>Equipo</TableCell>
                                                                        <TableCell sx={{ fontWeight: 600, p: 1, m: 0 ,color:theme.palette.background.default}}>Pts</TableCell>
                                                                        <TableCell sx={{ fontWeight: 600, p: 1, m: 0 ,color:theme.palette.background.default}}>Pj</TableCell>
                                                                        <TableCell sx={{ fontWeight: 600, p: 1, m: 0 ,color:theme.palette.background.default}}>G</TableCell>
                                                                        <TableCell sx={{ fontWeight: 600, p: 1, m: 0 ,color:theme.palette.background.default}}>E</TableCell>
                                                                        <TableCell sx={{ fontWeight: 600, p: 1, m: 0 ,color:theme.palette.background.default}}>P</TableCell>
                                                                        <TableCell sx={{ fontWeight: 600, p: 1, m: 0 ,color:theme.palette.background.default}}>Dif. goles</TableCell>
                                                                    </TableHead>
                                                                    {group.map((teams, teamIndex) => (
                                                                        <TableRow key={teamIndex}>
                                                                            {/* posicion */}
                                                                            <TableCell sx={{ fontWeight: 600, p: 1, m: 0 }}>{teams.rank}</TableCell>
                                                                            {/* equipo */}
                                                                            <TableCell sx={{ display: 'flex', alignItems: 'center', p: 1, m: 0, flexDirection: 'column', textAlign: 'center' }}>
                                                                                <img className="img_mini_logo" src={teams.team.logo} />
                                                                                <Link href={`/${comp.league.id}/${teams.team.name}/${teams.team.id}`}>
                                                                                    {teams.team.name}
                                                                                </Link></TableCell>
                                                                            {/* puntos */}
                                                                            <TableCell sx={{ p: 1, m: 0 }}>{teams.points}</TableCell>
                                                                            {/* partidos jugados */}
                                                                            <TableCell sx={{ p: 1, m: 0 }}>{teams.all.played}</TableCell>
                                                                            {/* partidos ganados */}
                                                                            <TableCell sx={{ p: 1, m: 0 }}>{teams.all.win}</TableCell>
                                                                            {/* partidos empatados */}
                                                                            <TableCell sx={{ p: 1, m: 0 }}>{teams.all.draw}</TableCell>
                                                                            {/* partidos perdidos */}
                                                                            <TableCell sx={{ p: 1, m: 0 }}>{teams.all.lose}</TableCell>
                                                                            {/* ratio de goles a favor y contra */}
                                                                            <TableCell sx={{ p: 1, m: 0 }}>{teams.all.goals.for}:{teams.all.goals.against}</TableCell>
                                                                            {/* ultimos partidos */}
                                                                        </TableRow>
                                                                    ))}
                                                                </Table>
                                                            </Grid>)
                                                    })

                                                ) : (
                                                    <Table component={Paper} sx={{mt:4,}} >
                                                        <TableHead sx={{backgroundColor:theme.palette.menu.primary }}>
                                                        <TableCell sx={{ fontWeight: 600, p: 1, m: 0,color:theme.palette.background.default }}>Pos</TableCell>
                                                                        <TableCell sx={{ fontWeight: 600, p: 1, m: 0,color:theme.palette.background.default }}>Equipo</TableCell>
                                                                        <TableCell sx={{ fontWeight: 600, p: 1, m: 0,color:theme.palette.background.default }}>Pts</TableCell>
                                                                        <TableCell sx={{ fontWeight: 600, p: 1, m: 0,color:theme.palette.background.default }}>Pj</TableCell>
                                                                        <TableCell sx={{ fontWeight: 600, p: 1, m: 0,color:theme.palette.background.default }}>G</TableCell>
                                                                        <TableCell sx={{ fontWeight: 600, p: 1, m: 0,color:theme.palette.background.default }}>E</TableCell>
                                                                        <TableCell sx={{ fontWeight: 600, p: 1, m: 0,color:theme.palette.background.default }}>P</TableCell>
                                                                        <TableCell sx={{ fontWeight: 600, p: 1, m: 0,color:theme.palette.background.default }}>Dif. goles</TableCell>
                                                        </TableHead>
                                                        {comp.league.standings[0].map((teams, teamIndex) => (
                                                            <TableRow>
                                                                {/* posicion */}
                                                                <TableCell sx={{ fontWeight: 600, p: 1, m: 0 }}>{teams.rank}</TableCell>
                                                                {/* equipo */}
                                                                <TableCell sx={{ display: 'flex', alignItems: 'center', p: 1, m: 0, gap: 1 }}>
                                                                    <img className="img_mini_logo" src={teams.team.logo} />
                                                                    <Link href={`/${comp.league.id}/${teams.team.name}/${teams.team.id}`}>
                                                                        {teams.team.name}
                                                                    </Link></TableCell>
                                                                {/* puntos */}
                                                                <TableCell sx={{ p: 1, m: 0 }}>{teams.points}</TableCell>
                                                                {/* partidos jugados */}
                                                                <TableCell sx={{ p: 1, m: 0 }}>{teams.all.played}</TableCell>
                                                                {/* partidos ganados */}
                                                                <TableCell sx={{ p: 1, m: 0 }}>{teams.all.win}</TableCell>
                                                                {/* partidos empatados */}
                                                                <TableCell sx={{ p: 1, m: 0 }}>{teams.all.draw}</TableCell>
                                                                {/* partidos perdidos */}
                                                                <TableCell sx={{ p: 1, m: 0 }}>{teams.all.lose}</TableCell>
                                                                {/* ratio de goles a favor y contra */}
                                                                <TableCell sx={{ p: 1, m: 0 }}>{teams.all.goals.for}:{teams.all.goals.against}</TableCell>
                                                                {/* ultimos partidos */}
                                                            </TableRow>
                                                        ))}
                                                    </Table>
                                                )
                                            }
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} sx={{mt:2}}>
                                    <select value={selectedRound} onChange={handleRoundChange}>
                                        <option value=''>Seleccionar Ronda</option>
                                        {
                                            [...uniqueRounds].map((round) => (
                                                <option key={round} value={round}>
                                                    {round}
                                                </option>
                                            ))
                                        }
                                    </select>
                                    <Table component={Paper} sx={{mt:2}}>
                                        <TableBody>

                                            {fixture?.map((match, index) => {
                                                // numRound = partido.league.round
                                                // console.log(match);
                                                const fechayhoraPartido = match.fixture.date;
                                                const fecha_hora_obj = new Date(fechayhoraPartido);
                                                const hora = fecha_hora_obj.getHours();
                                                const minutos = fecha_hora_obj.getMinutes();

                                                const horaMinutos = hora + ":" + (minutos < 10 ? "0" : "") + minutos;
                                                return (
                                                    <TableRow key={match.fixture.id} sx={{ height: '5px' }}>
                                                        <TableCell
                                                            sx={{
                                                                p: 1, width: '15%',
                                                                textAlign: 'center',
                                                                backgroundColor: match.fixture.status.short === 'FT' ? theme.palette.primary.main :
                                                                    match.fixture.status.short === 'NS' ? theme.palette.primary.main :
                                                                        match.fixture.status.short === 'HT' ? theme.palette.menu.secondary :
                                                                            match.fixture.status.short === 'TBD' ? theme.palette.primary.main :
                                                                                match.fixture.status.short === 'PST' ? theme.palette.primary.main :
                                                                                    match.fixture.status.short === 'AWD' ? theme.palette.primary.main :
                                                                                        theme.palette.error.main,


                                                                color: theme.palette.background.default,
                                                                textShadow: '2px 2px 2px 4px rgba(0, 0, 0, 0.5)',
                                                                fontWeight: 600
                                                            }}
                                                        >
                                                            {match.fixture.status.short === 'FT' ? <p>Final</p> :
                                                                match.fixture.status.short === 'HT' ? <p>E.T</p> :
                                                                    match.fixture.status.short === 'NS' ? horaMinutos :
                                                                        match.fixture.status.short === 'TBD' ? <p>Por definir</p> :
                                                                            match.fixture.status.short === 'PST' ? <p>Susp.</p> :
                                                                                match.fixture.status.short === 'AWD' ? <p>Sin datos</p> :
                                                                                    match.fixture.status.elapsed + "'"}
                                                        </TableCell>

                                                        <TableCell sx={{ p: 1, width: '30%', backgroundColor: theme.palette.secondary.main, textAlign: "center" }}>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                                                <img className="team_logo" src={match.teams.home.logo} />
                                                                <Link href={`/team/${match.teams.home.name}/${match.teams.home.id}`}>
                                                                    {match.teams.home.name}
                                                                </Link>
                                                            </Box>
                                                        </TableCell>

                                                        <TableCell sx={{ p: 1, width: '7%', borderRight: 1, textAlign: "center" }}>
                                                            {match.goals?.home ? match.goals.home : 0}
                                                        </TableCell>

                                                        <TableCell sx={{ p: 1, width: '7%', textAlign: "center" }}>
                                                            {match.goals?.away ? match.goals.away : 0}
                                                        </TableCell>

                                                        <TableCell sx={{ p: 1, width: '30%', backgroundColor: theme.palette.secondary.main, textAlign: "center" }}>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                                                <img className="team_logo" src={match.teams.away.logo} />
                                                                <Link href={`/team/${match.teams.away.name}/${match.teams.away.id}`}>
                                                                    {match.teams.away.name}
                                                                </Link>
                                                            </Box>
                                                        </TableCell>

                                                        <TableCell sx={{ p: 1, width: '10%', backgroundColor: theme.palette.menu.primary, textAlign: "center" }}>
                                                            <Link href={`/${match.fixture?.id}`}>
                                                                <TouchAppIcon />
                                                            </Link>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                        </TableBody>
                                    </Table>
                                </Grid>
                            </Grid>
                            <Grid container spacing={4} columns={12} marginTop={2}>
                                <Grid item xs={12} md={6}>
                                    <Scorer idCompetition={idCompetition} />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Assists idCompetition={idCompetition} />
                                </Grid>
                            </Grid>
                        </Container>
                    )
                })
        )}
        </>
    )
}
