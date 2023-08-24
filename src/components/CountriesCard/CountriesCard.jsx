import { Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import theme from "../../theme";

export default function CountriesCard({nations}) {
    console.log(nations);
    // const dispatch = useDispatch()
    const navigate = useNavigate();
    const handleDetailLeaguesCountry =()=>{
        let idCountry = nations.code;
        // console.log(idCountry);
        navigate(`/countries/${idCountry}`);
    }
    // const
    return (
        <Card
            onClick={handleDetailLeaguesCountry} sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems:'center',
                padding:1 ,
                cursor: 'pointer',
                backgroundColor:theme.palette.secondary.main
            }}>
            <Typography variant="h5" >{nations.name}</Typography>
            {/* <p>{nations.code}</p> */}
            <img className="img_cards" src={nations.flag} alt={`Bandera de ${nations.name}`} />

        </Card>
    )
}