import { Container, Typography } from "@mui/material";
import Matchs from "../Matchs/Matchs";
import MatchsToday from "./MatchsToday/MatchsToday";


export default function Home() {
    return (
        <Container sx={{ textAlign: "center", marginTop: 4 }}>
            <Typography variant="h4">Matches in live</Typography>
            
            {/* mostrar un aside con el top 10 ligas del mundo, libertadores, sudamericana, champions, europa league, conference league, concachampions, mls, qualed mundial */}
            <Matchs />
            <Typography variant="h4">Matchs Today</Typography>
            <MatchsToday/>
        </Container>
    )
}