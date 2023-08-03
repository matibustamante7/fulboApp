import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { getCompetitionByCountry } from "../../../redux/actions";
import { Container, Typography } from "@mui/material";
import CountriesCard from "../../CountriesCard/CountriesCard";
import CardCompetition from "../../CardCompetition/CardCompetition";

export default function LeaguesXCountry() {
    const {idCountry} = useParams();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getCompetitionByCountry(idCountry))
    },[])

    const competitions = useSelector((state)=>state.competitions);
    // console.log(competitions);
    let name = '';
    competitions.map((items)=>{
        name = items.country.name;
    })
    // console.log(name);
    return(
        <Container>
            {/* <CountriesCard/> */}
            <Typography variant="h4">{name}'s competitions</Typography>
            {/* <CardCompetition/> */}
            {
                competitions.map((competition)=>{
                    return(
                        <CardCompetition competitions={competition}/>
                    )
                })
            }
        </Container>
    )
}