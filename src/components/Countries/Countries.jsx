import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getNations } from "../../redux/actions";
import { Box, Container } from "@mui/material";
import CountriesCard from "../CountriesCard/CountriesCard";

export default function Countries() {

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getNations())    
    },[dispatch])
    const allNations = useSelector((state)=> state.allNations)

    // console.log(allNations);
    return(
        <Container>
            {
                allNations?.map((nations)=>{
                    return(
                        <Box>
                            <CountriesCard key={nations.code} nations={nations}/>
                        </Box>
                )})
            }
            <Box>
                {/* <CountriesCard /> */}
            </Box>
        </Container>
    )
}