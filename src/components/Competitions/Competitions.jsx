import { Container } from "@mui/material";
import Leagues from "../Leagues/Leagues";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { filterCompByCountry } from "../../redux/actions";

export default function Competitions() {
    const allLeagues = useSelector((state) => state.competitions);

    const [countries, setCountries] = useState(new Set());
    const dispatch = useDispatch();

    useEffect(() => {
        allLeagues?.forEach((leagues) => {
            setCountries((prevCountries) => new Set(prevCountries).add(leagues.country.name));
        });
    }, [allLeagues]);

    // Convierte el conjunto a una matriz si lo necesitas para otros propósitos
    const countriesArray = Array.from(countries);

    const handleFilterByCountry = (e) => {
        let country = e.target.value;
        dispatch(filterCompByCountry(country));
        // console.log(country);
    };

    return (
        <Container>
            <h1>Competitions</h1>
            {/* habrá filtros */}
            <label>Select country:  </label>
            <select onChange={handleFilterByCountry}>
                <option value="">Alls</option>
                {countriesArray.map((country, index) => (
                    <option key={index} value={country}>{country}</option>
                ))}
            </select>
            <Leagues />
        </Container>
    );
}
