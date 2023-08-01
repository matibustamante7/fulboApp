import { Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CountriesCard() {
    // console.log(nation);
    const navigate = useNavigate();
    const handleDetailLeaguesCountry =()=>{
        navigate(`/leaguesPais`);
    }
    return (
        <Card
            onClick={handleDetailLeaguesCountry} sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 2,
                padding: 2,
                cursor: 'pointer'
            }}>
            <Typography variant="h4">nombre pais</Typography>

            <img src='..ad' alt='bandera pais' />

        </Card>
    )
}