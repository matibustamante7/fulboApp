import axios from 'axios';
import { FILTER_COMP_BY_COUNTRY, GET_COMPETITION_DETAIL, GET_FIXTURE_LIVE, GET_INFO_TEAM, GET_LEAGUES, GET_NATIONS, GET_SCORER } from './actionsTypes';

// Acción para hacer la petición
export const getLeagues = () => {
  return (dispatch) => {
    // Despachamos una acción para indicar que se está haciendo la petición
    // Puedes definir estos tipos de acción según tus necesidades

    fetch("https://v3.football.api-sports.io/leagues", {
      method: "GET",
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": "a7af544a62f1e095ce165675f7feb720",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // consologeamos la respuesta
        // console.log(data.response);
        dispatch({ type: GET_LEAGUES, payload: data.response });
      })
      .catch((error) => {
        // Consologeamos el error
        console.log(error.message);
      });

  };
};

export const filterCompByCountry = (country) => {
  return ({ type: FILTER_COMP_BY_COUNTRY, payload: country })
}

export const getNations = () => {
  return (dispatch) => {
    fetch("https://v3.football.api-sports.io/countries", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": "a7af544a62f1e095ce165675f7feb720"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: GET_NATIONS, payload: data.response })
      })
      .catch(err => {
        console.log(err);
      });

  }
}
//peticion que trae informacion basica del equipo y los jugadores
// "idTeam" es el id del equipo que quiero informacion
export const getPlayer = (idTeam) => {
  return (dispatch) => {
    fetch(`c${idTeam}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": "a7af544a62f1e095ce165675f7feb720"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: GET_INFO_TEAM, payload: data.response })
      })
      .catch(err => {
        console.log(err);
      });

  }
}

//peticion para obtener EL GOLEADOR de cada competicion

export const getScorersCompetition = ({ anoTemporada, idLeague }) => {
  return (dispatch) => {
    fetch(`https://v3.football.api-sports.io/players/topscorers?season=${anoTemporada}&league=${idLeague}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": "a7af544a62f1e095ce165675f7feb720"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: GET_SCORER, payload: data.response })
      })
      .catch(err => {
        console.log(err);
      });
  }

}

export const getFixtureInlive = () => {
  return (dispatch) => {
    fetch("https://v3.football.api-sports.io/fixtures?live=all", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": "a7af544a62f1e095ce165675f7feb720"
      }
    })
      .then(response =>  response.json())
      .then((data)=>{
        // console.log(data.response);
        dispatch({type: GET_FIXTURE_LIVE, payload: data.response})
      })
      .catch(err => {
        console.log(err);
      });

  }
}

export const getCompetitionDetail =(nameCompetition)=>{
  console.log(nameCompetition);
  // return(dispatch)=>{
  //   fetch(`https://api-football.com/v3/leagues?name=${nameCompetition}`, {
  //     "method": "GET",
  //     "headers": {
  //       "x-rapidapi-host": "v3.football.api-sports.io",
  //       "x-rapidapi-key": "a7af544a62f1e095ce165675f7feb720"
  //     }
  //   })
  //     .then(response =>  response.json())
  //     .then((data)=>{
  //       console.log(data.response);
  //       dispatch({type: GET_COMPETITION_DETAIL, payload: data.response})
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }
}