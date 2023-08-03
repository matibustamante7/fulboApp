import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getLineUpsMatchDetail } from "../../../redux/actions";
import { useParams } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";

export default function MatchDetail() {
    const {idMatch} = useParams();
    console.log(idMatch);
    const dispatch =useDispatch();
    useEffect(()=>{
        dispatch(getLineUpsMatchDetail(idMatch))
    },[dispatch])

    const matchDetail = useSelector((state)=>state.lineUpsByMatch)
    console.log(matchDetail);
    return(
        <Container maxWidth>
            <h2>formacionmes</h2>
            {
                matchDetail.map((teams)=>{
                    return(
                        <Box>
                            <Typography variant="h5">{teams.team.name}</Typography>
                            <Typography variant="h5">Coach: {teams.coach.name}</Typography>
                            <Typography variant="h5">Line up: {teams.formation}</Typography>
                            <Box>
                                <Typography variant="h6">Initial 11</Typography>
                                {
                                    // console.log(teams)
                                    teams?.startXI.map((players)=>{
                                        // console.log(players.player.name);
                                        return(
                                            <Typography variant="body">{players.player.name} {players.player.number}</Typography>
                                        )
                                    })
                                }
                            </Box>
                            {/* <Box>
                                <Typography variant="h6">Subtitutes</Typography>
                                {
                                    teams.team?.subtitutes.map((subtitute)=>{
                                        return(
                                            <Typography variant="body">{subtitute.player.name} {subtitute.player.number}</Typography>
                                        )
                                    })
                                }
                            </Box> */}
                        </Box>
                    )
                })
            }
        </Container>
    )
}