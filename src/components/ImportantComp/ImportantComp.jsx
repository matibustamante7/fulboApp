import { Box, Button, Container, Drawer, Link, List, Paper, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLeagues } from '../../redux/actions';
import "../../App.css"
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

import MenuIcon from '@mui/icons-material/Menu';
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

    // console.log(filteredLeaguesByCountry);

    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };


    return (
        <Box sx={{pl:10, alignItems:'right'}}>
            <MenuIcon
            cursor='pointer'
            color='success'
            onClick={()=>setOpen(true)}/>

            <Drawer 
            open={open}
            anchor='right'
            onClose={()=>setOpen(false)}
            // sx={{display:{}}}
            component="div" id="nested-list-subheader"
            onClick={handleClick}>
            {Object.entries(filteredLeaguesByCountry).map(([country, competition]) => (
                <List
                    key={country} 
                    sx={{ width: '100%', maxWidth: 360, bgcolor:theme.palette.menu.secondary }}
                >
                    <ListItemButton
                    sx={{bgcolor:theme.palette.menu.primary}}>

                        <ListItemText primary={country} sx={{ color:theme.palette.background.default}} />
                        
                    </ListItemButton>

                    {competition.map((comp) => (
                        <ListItemButton key={comp.id}
                        sx={{bgcolor:theme.palette.menu.secondary}}
                        onClick={()=>setOpen(false)}>
                            <Link href={`/competitions/${comp.id}`}
                            sx={{textDecoration:'none'}}>
                                <ListItemText secondary={comp.name}
                                />
                            </Link>
                        </ListItemButton>
                    ))}
                </List>
            ))}
            </Drawer>

        </Box>
    );
}
