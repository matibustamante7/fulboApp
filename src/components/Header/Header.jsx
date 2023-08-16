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
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '50ch',
        },
    },
}));

export default function Headr() {

    const [searchTerm, setSearchTerm] = useState('');

    const resultadosBusqueda = useSelector((state) => state.searchResults)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        dispatch(searchBar())
    },[])
    const handleSearchBar = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearchTerm(searchTerm)
        dispatch(searchBar(searchTerm))
    }
    const navHome = () => {
        navigate('/')
    }
    // console.log(resultadosBusqueda);
    return (
        <Grid container sx={{backgroundColor:theme.palette.primary.main, alignItems:'center'}}>
            <Grid item xs={3} >
            <Typography variant="body" onClick={navHome}
                sx={{
                    color: theme.palette.success.main,
                    fontWeight: 600,
                    margin:'auto',
                    cursor:'pointer',
                    fontSize: '1rem',  // Tamaño de fuente base
                    [theme.breakpoints.up('sm')]: {
                        fontSize: '1.2rem',  // Tamaño de fuente para pantallas pequeñas (sm) y más grandes
                    },
                    [theme.breakpoints.up('md')]: {
                        fontSize: '2.5rem',  // Tamaño de fuente para pantallas medianas (md) y más grandes
                    },
                    // Puedes seguir agregando breakpoints según tus necesidades
                }}>FulboApp</Typography>
            </Grid>
            <Grid item xs={6}>
            <Search sx={{ width: 'xl' }}
                onChange={handleSearchBar}>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search competitions or countries..."
                    inputProps={{ 'aria-label': 'search' }}
                />  
                {/* <input type="text" value={searchTerm} onChange={handleSearchBar} /> */}
                {/* Resto del código para mostrar los resultados posibles */}
                <ul className="results-searchbar show">
                    {resultadosBusqueda.map((result) => {
                        // console.log(result)
                        const leagueId = result.league?.id || ''; // Validar si existe el id de la liga
                        const countryCode = result.code || ''; // Validar si existe el código del país

                        return (
                            <li className="results-li" key={result.id}>
                                <Link className="results-li"
                                    href={
                                        result.league?.name
                                            ? `/competitions/${leagueId}`
                                            : `/countries/${countryCode}`
                                    }
                                >
                                    {result.league?.name ? result.league.name : result.name} -{' '}
                                    {result.league?.name ? result.country.name : ''}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </Search>
            
            {/* <StyledInputBase
                    placeholder="Search competitions or countries..."
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchTerm} // Agrega esto para mantener el valor del input controlado
                    onChange={handleSearchBar}
                /> */}
            </Grid>
            <Grid item xs={3}>
            <ImportantComp/>
            </Grid>
        </Grid>
        
    )
}