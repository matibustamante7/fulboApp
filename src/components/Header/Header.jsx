import { useState } from "react";
import './header.css'
import { useDispatch } from "react-redux";
import { getLeagues } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";
import theme from "../../theme";


export default function Headr() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSearchBar = (e) => {
        let searching = e.target.value;
        //generar el dispatch, action y reducer correspondiente
        dispatch(getLeagues(searching))
    }
    const navHome = () => {
        navigate('/')
    }
    return (
        <Container maxWidth sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', backgroundColor: theme.palette.primary.main }}>

            <Typography variant="h3" onClick={navHome}
            sx={{color:theme.palette.success.main, fontWeight:600}}>FulboApp</Typography>

            <form action="/search" onChange={handleSearchBar}>
                <input
                    type="text"
                    name="search"
                    placeholder="Seacrh..."
                    className="searchbar" />
            </form>
            <form action="#">
                <div className="btn_login">Login</div>
                {/* <div></div> */}
            </form>
        </Container>
    )
}