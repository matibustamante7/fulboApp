import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLeagues } from "../../redux/actions"
import { Box } from "@mui/material";
import CardCompetition from "../CardCompetition/CardCompetition";

export default function Leagues() {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getLeagues())
    }, [dispatch])

    const allLeagues = useSelector((state) => state.allCompetitions)

     
    return (
        <div>
           
            {
                allLeagues?.map((competitions) => {
                    return (
                        <Box>
                            <CardCompetition key={competitions.league.id} competitions={competitions}/>
                        </Box>
                    )
                })
            }
        </div>
    );
}

