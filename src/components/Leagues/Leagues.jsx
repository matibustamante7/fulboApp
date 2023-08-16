import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLeagues } from "../../redux/actions"
import { Box } from "@mui/material";
import CardCompetition from "../CardCompetition/CardCompetition";

export default function Leagues() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getLeagues());
    }, []);

    const allLeagues = useSelector((state) => state.searchResults.length > 0 ? state.searchResults : state.allCompetitions);

    return (
        <div>
            {allLeagues.map((competitions) => (
                <Box key={competitions.league.id}>
                    <CardCompetition competitions={competitions} />
                </Box>
            ))}
        </div>
    );
}