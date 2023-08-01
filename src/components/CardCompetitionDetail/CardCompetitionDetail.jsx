import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { getCompetitionDetail } from "../../redux/actions";

export default function CardCompetitionDetail() {
    const {nameCompetition} = useParams()
    const dispatch = useDispatch();
    console.log(nameCompetition);

    useEffect(()=>{
        dispatch(getCompetitionDetail(nameCompetition))    
    },[dispatch])

    // const detailCompetition = useSelector((state)=>state.detailCompetition)
    // console.log(detailCompetition);

    console.log('estas en card competition detail de '+{nameCompetition});
    return(
        <h1>detalle de la competicion {nameCompetition}</h1>
    )
}