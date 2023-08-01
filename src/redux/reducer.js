import { FILTER_COMP_BY_COUNTRY, GET_COMPETITION_DETAIL, GET_FIXTURE_LIVE, GET_INFO_TEAM, GET_LEAGUES, GET_NATIONS, GET_SCORER } from "./actionsTypes";

const initialState = {
    competitions: [],
    allCompetitions: [],
    nations: [],
    allNations: [],
    //resultados en vivo
    fixtureInLive:[],
    //detalle de la competicion
    competitionDetail:{},
    //infoteam es un arr con datos basicos del equipo, jugadores con id name age number position y photo
    infoTeam:[],
    //scorer el goleaador de la tempodada
    scorer:[],

}

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_LEAGUES:

            return {
                ...state,
                competitions: payload,
                allCompetitions: payload
            }
        case GET_NATIONS:
            return {
                ...state,
                nations: payload,
                allNations: payload
            }
        case GET_INFO_TEAM:
            return {
                ...state,
                infoTeam: payload
            }
        case GET_SCORER:
            return{
                ...state,
                scorer: payload
            }
        case GET_FIXTURE_LIVE:
            return{
                ...state,
                fixtureInLive: payload
            }
        case GET_COMPETITION_DETAIL:
            return{
                ...state,
                competitionDetail: payload
            }
        case FILTER_COMP_BY_COUNTRY:
            let allCompe = state.allCompetitions;
            let filterComByCountry = payload === '' ? allCompe : allCompe.filter(country => country.country.name === payload)
            return {
                ...state,
                competitions: filterComByCountry
            }
        default:
            return { ...state }
    }
}
export default reducer