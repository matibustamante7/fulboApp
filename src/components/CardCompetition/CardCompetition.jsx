import { Box, Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../../App.css"
export default function CardCompetition(competitions) {
    // console.log(competitions.competitions.league.name);
    const navigate = useNavigate();
    const handleDetailCompetititon = () => {
        let idCompetition = competitions.competitions.league.id;
        navigate(`/competitions/${idCompetition}`)
    }

    return (
        <Card
            onClick={handleDetailCompetititon} sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                cursor: 'pointer',
                minHeight: '5rem',
                alignItems:'center',
                padding:1 ,
            }}>

            <Typography variant="h5">{competitions.competitions.league.name}</Typography>
            <img className="img_player" src={competitions.competitions.league.logo} alt={competitions.competitions.league.name} />

        </Card>
    )
}