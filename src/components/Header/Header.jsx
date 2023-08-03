import { useState } from "react";
import './header.css'
import { useDispatch } from "react-redux";
import { getLeagues, searchBar } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { Box, Container, InputBase, Typography, alpha } from "@mui/material";
import theme from "../../theme";
import styled from "@emotion/styled";
import SearchIcon from '@mui/icons-material/Search';

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

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSearchBar = (e) => {
        let searching = e.target.value;
        console.log(searching);
        //generar el dispatch, action y reducer correspondiente
        dispatch(searchBar(searching))
    }
    const navHome = () => {
        navigate('/')
    }
    return (
        <Container maxWidth sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', backgroundColor: theme.palette.primary.main }}>

            <Typography variant="h3" onClick={navHome}
                sx={{ color: theme.palette.success.main, fontWeight: 600 }}>FulboApp</Typography>

            <Search sx={{ width: 'xl' }}
                onChange={handleSearchBar}>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search competitions, countries and players…"
                    inputProps={{ 'aria-label': 'search' }}
                />
            </Search>

            <form action="#">
                <div className="btn_login">Login</div>
                {/* <div></div> */}
            </form>
        </Container>
    )
}