import { useEffect, useState } from "react";
import './header.css'
import { useDispatch, useSelector } from "react-redux";
import { searchBar } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { Box, Container, Grid, InputBase, Link, Typography, alpha } from "@mui/material";
import theme from "../../theme";
import styled from "@emotion/styled";
import SearchIcon from '@mui/icons-material/Search';
import ImportantComp from "../ImportantComp/ImportantComp";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));


export default function Headr() {


    const resultadosBusqueda = useSelector((state) => state.searchResults)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // useEffect(()=>{
    //     dispatch(searchBar())
    // },[])

    const navHome = () => {
        navigate('/')
    }
    // console.log(resultadosBusqueda);
    return (
            <Grid container columns={12} spacing={1} sx={{ backgroundColor: theme.palette.primary.main, alignItems: 'center', height:'6rem' }}>
                <Grid item xs={6} >
                    <Typography variant="body" onClick={navHome}
                        sx={{
                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                            color: theme.palette.menu.secondary,
                            fontWeight: 600,
                            margin: 'auto',
                            cursor: 'pointer',
                            fontSize: '1rem',  // Tamaño de fuente base
                            [theme.breakpoints.up('sm')]: {
                                fontSize: '2.2rem',  // Tamaño de fuente para pantallas pequeñas (sm) y más grandes
                            },
                            [theme.breakpoints.up('md')]: {
                                fontSize: '2.5rem',  // Tamaño de fuente para pantallas medianas (md) y más grandes
                            },
                            [theme.breakpoints.up('xs')]: {
                                fontSize: '1.9rem',  // Tamaño de fuente para pantallas medianas (md) y más grandes
                            },
                            // Puedes seguir agregando breakpoints según tus necesidades
                        }}>FulboApp</Typography>
                </Grid>
                <Grid item xs={6}>
                    <ImportantComp />
                </Grid>
            </Grid>

    )
}