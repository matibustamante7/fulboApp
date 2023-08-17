
import { SEARCH_BAR_COUNTRIES, CHANGE_COMPETITION, FILTER_COMP_BY_COUNTRY, GET_ASSISTS, GET_COMPETITION_DETAIL, GET_FIXTURE_COMPETITION, GET_FIXTURE_COMPETITION_ALL_ROUNDS, GET_FIXTURE_LIVE, GET_FIXTURE_TODAY, GET_INFO_TEAM, GET_LEAGUES, GET_LINEUPS_ID_MATCH, GET_NATIONS, GET_SCORERS, GET_TABLE_COMPETITION, SEARCH_BAR, GET_FIXTURE_TODAY_BY_COMPETITION, GET_TEAM_SQUAD, GET_TEAM_STADIUM, GET_TEAM_STADISTICS, GET_TEAM_COACH, GET_EVENTS_MATCH, GET_PLAYER, GET_SEASONS, GET_COMPETITION_SEARCHBAR, GET_CUPS } from "./actionsTypes";

const initialState = {
    competitions: [],
    allCompetitions: [],
    nations: [],
    allNations: [],
    // fixture de competicion
    fixtureByCompetition: [],
    // partidos de hoy 
    fixtureToday: [],
    //resultados en vivo
    fixtureInLive: [],
    // fixture de todas las rodas de la competicion
    fixtureCompetitionAllRounds: [],
    //detalle de la competicion
    competitionDetail: [],
    //tabla de posiciones
    tableCompetition: [],
    //infoteam es un arr con datos basicos del equipo, jugadores con id name age number position y photo
    infoTeam: [],
    //scorer el goleaadores de la tempodada
    scorers: [],
    //assists asistestes de la competicion
    assists: [],
    //alineaciones del partido del dia o en vivo
    lineUpsByMatch: [],
    // eventos del partido
    eventsOnTheMatch: [],
    // resultado de searchbar
    searchResults: [],
    // squad del equipo
    teamSquad: [],
    // team stadium
    teamStadium: [],
    // estadisticas de la temporada anterior del equipo
    teamStadistics: [],
    // entrenador by id team
    teamCoach: [],
    // detalle del player
    player: [],
    // temporadas con datos
    seasons:[],
}

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_LEAGUES:

            return {
                ...state,
                competitions: payload,
                allCompetitions: payload
            }
        case GET_CUPS:
            return{
            ...state,
            competitions: payload
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
        case GET_FIXTURE_TODAY:
            return {
                ...state,
                fixtureToday: payload
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
        case GET_FIXTURE_TODAY_BY_COMPETITION:
            return {
                ...state,
                fixtureToday: payload
            }
        case GET_FIXTURE_COMPETITION_ALL_ROUNDS:
            return {
                ...state,
                fixtureCompetitionAllRounds: payload
            }
        case GET_LINEUPS_ID_MATCH:
            return {
                ...state,
                lineUpsByMatch: payload
            }
        case GET_EVENTS_MATCH:
            return {
                ...state,
                eventsOnTheMatch: payload
            }
        case GET_TEAM_SQUAD:
            return {
                ...state,
                teamSquad: payload
            }
        case GET_TEAM_STADIUM:
            return {
                ...state,
                teamStadium: payload
            }
        case GET_TEAM_STADISTICS:
            return {
                ...state,
                teamStadistics: payload,
            }
        case GET_TEAM_COACH:
            return {
                ...state,
                teamCoach: payload
            }
        case GET_PLAYER:
            return {
                ...state,
                player: payload
            }
        case GET_SEASONS:
            return{
                ...state,
                seasons: payload
            }
        case CHANGE_COMPETITION:
            let allCompetitions = state.allCompetitions;
            let handleChangeCompetition = payload === '' ? allCompetitions : allCompetitions.filter(competitionId => competitionId.id === payload)
            return {
                ...state,
                competitions: handleChangeCompetition
            }
        case FILTER_COMP_BY_COUNTRY:

            // console.log(filterComByCountry);
            return {
                ...state,
                competitions: payload
            }
        case GET_COMPETITION_SEARCHBAR:
            let busqueda = allCompetitions.filter((comp)=> comp.name.includes(payload))
            return {
                ...state,
                allCompetitions: busqueda
            }
        // case SEARCH_BAR_COUNTRIES:
        //     // solo busca competiciones paises no
        //     let search_countries = state.allNations.filter((nation) => nation.name.toLowerCase().includes(payload)) ?
        //         state.allNations.filter((competition) => competition.league.name.toLowerCase().includes(payload)) :
        //         state.allNations.filter((nation) => nation.name.toLowerCase().includes(payload))
        //     // console.log(search);
        //     return {
        //         ...state,
        //         allCompetitions: search,
        //         allNations: search
        //     }
        default:
            return { ...state }
    }
}
export default reducer