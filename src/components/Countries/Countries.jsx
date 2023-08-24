import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getNations } from "../../redux/actions";
import { Box, Container, Grid } from "@mui/material";
import CountriesCard from "../CountriesCard/CountriesCard";

export default function Countries() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getNations())
    }, [dispatch])
    const allNations = useSelector((state) => state.allNations)

    // console.log(allNations);
    return (
        <Container>
            <Grid container columns={12} spacing={1} sx={{ mt: 10 }}>
                {
                    allNations?.map((nations) => {
                        return (
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <CountriesCard key={nations.code} nations={nations} />
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Container>
    )
}