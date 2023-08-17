import { Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
                margin: 2,
                padding: 2,
                cursor: 'pointer'
            }}>
            <Typography variant="h4">{nations.name}</Typography>
            {/* <p>{nations.code}</p> */}
            <img className="img_cards" src={nations.flag} alt='bandera pais' />

        </Card>
    )
}