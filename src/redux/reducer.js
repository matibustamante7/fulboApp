import { CHANGE_COMPETITION, FILTER_COMP_BY_COUNTRY, GET_ASSISTS, GET_COMPETITION_DETAIL, GET_FIXTURE_COMPETITION, GET_FIXTURE_LIVE, GET_INFO_TEAM, GET_LEAGUES, GET_NATIONS, GET_SCORERS, GET_TABLE_COMPETITION } from "./actionsTypes";

const initialState = {
    competitions: [],
    allCompetitions: [],
    nations: [],
    allNations: [],
    // fixture de competicion
    fixtureByCompetition: [],
    //resultados en vivo
    fixtureInLive: [],
    //detalle de la competicion
    competitionDetail: [],
    //tabla de posiciones
    tableCompetition: [],
    //infoteam es un arr con datos basicos del equipo, jugadores con id name age number position y photo
    infoTeam: [],
    //scorer el goleaadores de la tempodada
    scorers: [],
    //assists asistestes de la competicion
    assists:[]

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
        case GET_SCORERS:
            return {
                ...state,
                scorers: payload
            }
        case GET_ASSISTS:
            return {
                ...state,
                assists: payload
            }
        case GET_FIXTURE_LIVE:
            return {
                ...state,
                fixtureInLive: payload
            }
        case GET_COMPETITION_DETAIL:
            return {
                ...state,
                competitionDetail: payload
            }
        case GET_TABLE_COMPETITION:
            return {
                ...state,
                tableCompetition: payload
            }
        case GET_FIXTURE_COMPETITION:
            return {
                ...state,
                fixtureByCompetition: payload
            }
        case CHANGE_COMPETITION:
            let allCompetitions = state.allCompetitions;
            let handleChangeCompetition = payload === '' ? allCompetitions : allCompetitions.filter(competitionId => competitionId.id === payload)
            return {
                ...state,
                competitions: handleChangeCompetition
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