import { Box, Button, Container, Drawer, Link, List, Paper, Typography, useMediaQuery } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLeagues } from '../../redux/actions';
import "../../App.css"
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import "./import.css"
import MenuIcon from '@mui/icons-material/Menu';
import theme from '../../theme';
import { UseMediaQuery } from '@mui/material';
import styled from '@emotion/styled';

const MyComponentWrapper = styled('div')(({ theme }) => ({
    padding: '20px', // Estilo base

    // Aplicar el estilo solo en pantallas más pequeñas que 'sm'
    [theme.breakpoints.down('sm')]: {
        padding: '10px',
    },
}));
const HoverButton = styled(Button)({
    '&:hover': {
        backgroundColor: theme.palette.menu.secondary,
        color: theme.palette.primary.main,
    },
});
const ListLeagues = styled('div')(({ theme }) => ({
    width: 600,
    bgcolor: theme.palette.menu.secondary,
    [theme.breakpoints.down('xl')]: {
        width: 500, // Cambia el ancho para resoluciones medianas
    },
    [theme.breakpoints.down('lg')]: {
        width: 380, // Cambia el ancho para resoluciones medianas
    },
    [theme.breakpoints.down('md')]: {
        width: 200, // Cambia el ancho para resoluciones medianas
    },
    [theme.breakpoints.down('sm')]: {
        width: 200, // Cambia el ancho para resoluciones pequeñas
    },
    [theme.breakpoints.down('xs')]: {
        width: 100, // Cambia el ancho para resoluciones medianas
    },
}));
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

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLeagues())
    }, [])
    const allCompetitions = useSelector((state) => state.allCompetitions);
    const idsCompetitions = [39, 135, 140, 61, 94, 128, 129, 483, 130, 13, 11, 2, 3];
    const filteredLeaguesByCountry = {};

    // Supongamos que "competitions" es tu objeto inicial

    Object.values(allCompetitions).forEach((competition) => {
        if (idsCompetitions.includes(competition.league.id)) {
            const countryName = competition.country.name;
            const idCountry = competition.country.id;
            if (!filteredLeaguesByCountry[countryName]) {
                filteredLeaguesByCountry[countryName] = [];
            }

            filteredLeaguesByCountry[countryName].push(competition.league);
        }

    });


    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

            <MyComponentWrapper>
                {isSmallScreen ? (
                    <MenuIcon
                        cursor='pointer'
                        sx={{ color: theme.palette.menu.secondary }}
                        onClick={() => setOpen(true)}
                    />
                ) : (
                    <HoverButton variant="contained" onClick={() => setOpen(true)}
                        sx={{ backgroundColor: theme.palette.menu.primary, color: theme.palette.background.default }}>
                        Ligas destacadas
                    </HoverButton>
                )}
            </MyComponentWrapper>
            <Drawer
                open={open}
                anchor='right'
                onClose={() => setOpen(false)}
                component="div" id="nested-list-subheader"
                onClick={handleClick}
            >
                <ListSubheader sx={{ bgcolor: theme.palette.secondary.main }}>Principales ligas</ListSubheader>

                <ListLeagues>
                    {Object.entries(filteredLeaguesByCountry).map(([country, competition]) => {
                        return (
                            <div key={country}> {/* Envolver cada iteración en un div */}

                                <ListItemButton sx={{ bgcolor: theme.palette.menu.primary }}>
                                    <ListItemText primary={country} sx={{ color: theme.palette.background.default }} />
                                </ListItemButton>

                                {competition.map((comp) => (
                                    <ListItemButton key={comp.id} sx={{ bgcolor: theme.palette.menu.secondary }} onClick={() => setOpen(false)}>
                                        <Link href={`/competitions/${comp.id}`} sx={{ textDecoration: 'none' }}>
                                            <ListItemText secondary={comp.name} />
                                        </Link>
                                    </ListItemButton>
                                ))}
                            </div>
                        )
                    })}
                </ListLeagues>
            </Drawer>
        </Box>
    );

}
