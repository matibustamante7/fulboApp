import { Box, Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CardCompetition(competitions) {
    // console.log(competitions.competitions.league.name);
    const navigate = useNavigate();
    const handleDetailCompetititon = () => {
        navigate(`/${competitions.competitions.league.name}`)
    }

    return (
        <Card
        onClick={handleDetailCompetititon} sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 2,
            padding: 2,
            cursor:'pointer'
        }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection:'column',
                    justifyContent:'center'
                }}>
                <Typography variant="h4">{competitions.competitions.league.name}</Typography>
                <Typography variant="h6">Country: {competitions.competitions.country.name}</Typography>
            </Box>

            <img src={competitions.competitions.league.logo} alt={competitions.competitions.league.name} />

        </Card>
    )
}