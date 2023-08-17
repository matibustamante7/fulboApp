import { Container } from "@mui/material";
import Leagues from "../Leagues/Leagues";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCompetitionByCountry, getNations } from "../../redux/actions";
import { useNavigate } from "react-router-dom";

export default function Competitions() {
    const allLeagues = useSelector((state) => state.competitions);

    const [countries, setCountries] = useState(new Set());
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getNations())
        
    }, [allLeagues]);

    const allCountries = useSelector((state) => state.allNations);
    // console.log(allCountries);

    const handleFilterByCountry = (e) => {
        let country = e.target.value;
        dispatch(getCompetitionByCountry(country));
        // navigate(`/${}`)
        // console.log(country);
    };

    return (
        <Container>
            <h1>Competitions</h1>
            {/* habrá filtros */}
            {/* <label>Select country:  </label>
            <select onChange={handleFilterByCountry}>
                <option value="">Alls</option>
                {allCountries.map((country, index) => (
                    <option key={index} value={country.code}>{country.name}</option>
                ))}
            </select> */}
            <Leagues />
        </Container>
    );
}
