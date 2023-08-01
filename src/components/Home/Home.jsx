import { Container, Typography } from "@mui/material";
import Matchs from "../Matchs/Matchs";

export default function Home() {
    return (
        <Container sx={{textAlign:"center", marginTop:4}}>
            <Typography variant="h4">Today's matches in live</Typography>
                {/* mostrar un aside con el top 10 ligas del mundo, libertadores, sudamericana, champions, europa league, conference league, concachampions, mls, qualed mundial */}
            <Matchs/>
        </Container>
    )
}