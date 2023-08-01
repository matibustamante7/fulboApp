import { Box, Container, Typography } from "@mui/material";
import { Link } from '@mui/material';
import theme from "../../theme";

export default function SubHeader() {
    return (
        <Container maxWidth>
            <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-around', gap:2, width:200, margin:'2rem auto'}}>
                
                <Link href={'/competitions'} sx={{textDecoration:'none',  color:theme.palette.success.main}}>
                    <Typography variant="h5">Competitions</Typography>
                </Link>
                <Link href={'/countries'} sx={{textDecoration:'none',  color:theme.palette.success.main}}>
                    <Typography variant="h5">Countries</Typography>
                </Link>
            </Box>
        </Container>
    )
}