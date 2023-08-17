import axios from 'axios';
import { CHANGE_COMPETITION, FILTER_COMP_BY_COUNTRY, GET_ASSISTS, GET_COMPETITIONS_X_NATION, GET_COMPETITION_DETAIL, GET_COMPETITION_SEARCHBAR, GET_CUPS, GET_EVENTS_MATCH, GET_FIXTURE_COMPETITION, GET_FIXTURE_COMPETITION_ALL_ROUNDS, GET_FIXTURE_LIVE, GET_FIXTURE_TODAY, GET_FIXTURE_TODAY_BY_COMPETITION, GET_INFO_TEAM, GET_LEAGUES, GET_LINEUPS_ID_MATCH, GET_NATIONS, GET_PLAYER, GET_SCORER, GET_SCORERS, GET_SEASONS, GET_TABLE_COMPETITION, GET_TEAM_COACH, GET_TEAM_SQUAD, GET_TEAM_STADISTICS, GET_TEAM_STADIUM, SEARCH_BAR, SEARCH_BAR_COUNTRIES } from './actionsTypes';

// constantes de conexion a la api
const apiKey = "bba95c3060msh4930064c3cfdd21p15954fjsnaf0242dc11db";
const host = 'api-football-v1.p.rapidapi.com'

//constantes del dia de la fecha
const today = new Date();
const year = today.getFullYear();
// Agregar cero al mes si es menor a 10s
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');

// Acción para hacer la petición
export const getLeagues = () => {
  return (dispatch) => {
    // Despachamos una acción para indicar que se está haciendo la petición
    // Puedes definir estos tipos de acción según tus necesidades

    fetch("https://api-football-v1.p.rapidapi.com/v3/leagues", {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": host,
        "X-RapidAPI-Key": apiKey,
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
// 
export const getCups = (idCompetition) => {
  return (dispatch) => {
    // Despachamos una acción para indicar que se está haciendo la petición
    // Puedes definir estos tipos de acción según tus necesidades

    fetch(`https://api-football-v1.p.rapidapi.com/v3/leagues?id=${idCompetition}&type=cup`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": host,
        "X-RapidAPI-Key": apiKey,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // consologeamos la respuesta
        console.log(data.response);
        dispatch({ type: GET_CUPS, payload: data.response });
      })
      .catch((error) => {
        // Consologeamos el error
        console.log(error.message);
      });

  };
};

export const getCompetitionById = (idCompetition) => {
  return (dispatch) => {
    fetch(`https://api-football-v1.p.rapidapi.com/v3/leagues?id=${idCompetition}`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": host,
        "X-RapidAPI-Key": apiKey,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch({ type: GET_COMPETITION_DETAIL, payload: data.response })
      })
      .catch((error) => {
        console.log(error.message);
      })
  }
}

export const getTableCompetition = (idCompetition) => {
  // console.log(idCompetition);
        // https://api-football-v1.p.rapidapi.com/v3/standings?season=2022&league=2
  return (dispatch) => {
    fetch(`https://api-football-v1.p.rapidapi.com/v3/standings?season=${year? year : year-1}&league=${idCompetition}`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": host,
        "X-RapidAPI-Key": apiKey,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.response);
        dispatch({ type: GET_TABLE_COMPETITION, payload: data.response })
      })
      .catch((error) => {
        console.log(error.message);
      })
  }
}



export const filterCompByCountry = (country) => {
  return ({ type: FILTER_COMP_BY_COUNTRY, payload: country })
}
export const handleChangeCompetition = (competitionId) => {
  return ({ type: CHANGE_COMPETITION, payload: competitionId })
}

export const getNations = () => {
  return (dispatch) => {
    fetch("https://api-football-v1.p.rapidapi.com/v3/countries", {
      "method": "GET",
      "headers": {
        "X-RapidAPI-Host": host,
        "X-RapidAPI-Key": apiKey,
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
// export const getPlayer = (idTeam) => {
//   return (dispatch) => {
//     fetch(`c${idTeam}`, {
//       "method": "GET",
//       "headers": {
//         "X-RapidAPI-Host": host,
//         "X-RapidAPI-Key": apiKey,
//       }
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         dispatch({ type: GET_INFO_TEAM, payload: data.response })
//       })
//       .catch(err => {
//         console.log(err);
//       });

//   }
// }

//peticion para obtener goleadores de cada competicion

export const getScorersCompetition = (idCompetition) => {
  return (dispatch) => {
    fetch(`https://api-football-v1.p.rapidapi.com/v3/players/topscorers?league=${idCompetition}&season=${year}`, {
      "method": "GET",
      "headers": {
        "X-RapidAPI-Host": host,
        "X-RapidAPI-Key": apiKey,
      }
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        dispatch({ type: GET_SCORERS, payload: data.response })
      })
      .catch(err => {
        console.log(err);
      });
  }

}

//peticion para obtener asistidores de cada competicion

export const getAssistsCompetition = (idCompetition) => {
  return (dispatch) => {
    fetch(`https://api-football-v1.p.rapidapi.com/v3/players/topassists?league=${idCompetition}&season=${year}`, {
      "method": "GET",
      "headers": {
        "X-RapidAPI-Host": host,
        "X-RapidAPI-Key": apiKey,
      }
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        dispatch({ type: GET_ASSISTS, payload: data.response })
      })
      .catch(err => {
        console.log(err);
      });
  }

}
// partidos en vivo
export const getFixtureInlive = (idCompetition) => {
  // console.log(idCompetition);
  const endpoint = `https://api-football-v1.p.rapidapi.com/v3/fixtures?live=${idCompetition ? `all&league=${idCompetition}` : 'all'}`;

  return (dispatch) => {
    fetch(endpoint, {
      "method": "GET",
      "headers": {
        "X-RapidAPI-Host": host,
        "X-RapidAPI-Key": apiKey,
      }
    })
      .then(response => response.json())
      .then((data) => {
        // console.log(data.response);
        dispatch({ type: GET_FIXTURE_LIVE, payload: data.response })
      })
      .catch(err => {
        console.log(err);
      });

  }
}

export const getFixtureTodayByCompetition = (idCompetition) => {
  console.log(idCompetition);
  return (dispatch) => {
    fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?date=${year}-${month}-${day}&league=${idCompetition}&season=${year}`, {
      "method": "GET",
      "headers": {
        "X-RapidAPI-Host": host,
        "X-RapidAPI-Key": apiKey,
      }
    })
      .then(response => response.json())
      .then((data) => {
        // console.log(data.response);
        dispatch({ type: GET_FIXTURE_TODAY_BY_COMPETITION, payload: data.response })
      })
      .catch(err => {
        console.log(err);
      });

  }
}
//partidos de la fecha
export const getFixtureToday = () => {
  return (dispatch) => {
    fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?date=${year}-${month}-${day}`, {
      "method": "GET",
      "headers": {
        "X-RapidAPI-Host": host,
        "X-RapidAPI-Key": apiKey,
      }
    })
      .then(response => response.json())
      .then((data) => {
        // console.log(data.response);
        dispatch({ type: GET_FIXTURE_TODAY, payload: data.response })
      })
      .catch(err => {
        console.log(err);
      });

  }
}
// fixture de todas las fechas
export const getFixtureByCompetitionAllRounds = (idCompetition) => {
  // console.log(season)
  return (dispatch) => {
    fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${idCompetition}&season=${year}`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": host,
        "X-RapidAPI-Key": apiKey,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.response);
        dispatch({ type: GET_FIXTURE_COMPETITION_ALL_ROUNDS, payload: data.response })
      })
      .catch((error) => {
        console.log(error.message);
      })
  }
}

//fixture detail competition
export const getFixtureByCompetition = ({ idCompetition, numRound }) => {
  // console.log(idCompetition, numRound);
  const numRoundEncoded = encodeURIComponent(numRound);
  return (dispatch) => {
    fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${idCompetition}&season=${year}&round=${numRoundEncoded}`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": host,
        "X-RapidAPI-Key": apiKey,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.response);
        dispatch({ type: GET_FIXTURE_COMPETITION, payload: data.response })
      })
      .catch((error) => {
        console.log(error.message);
      })
  }
}

export const getLineUpsMatchDetail = (idMatch) => {

  return (dispatch) => {
    fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures/lineups?fixture=${idMatch}`, {
      "method": "GET",
      "headers": {
        "X-RapidAPI-Host": host,
        "X-RapidAPI-Key": apiKey,
      }
    })
      .then(response => response.json())
      .then((data) => {
        // console.log(data.response);
        dispatch({ type: GET_LINEUPS_ID_MATCH, payload: data.response })
      })
      .catch(err => {
        console.log(err);
      });
  }
}
// incidencias del partido
export const getEventsOnMatch = (idMatch, idteam) => {

  return (dispatch) => {
    fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures/events?fixture=${idMatch}&team=${idteam}`, {
      "method": "GET",
      "headers": {
        "X-RapidAPI-Host": host,
        "X-RapidAPI-Key": apiKey,
      }
    })
      .then(response => response.json())
      .then((data) => {
        // console.log(data.response);
        dispatch({ type: GET_EVENTS_MATCH, payload: data.response })
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export const getCompetitionDetail = (idCompetition) => {
  console.log(idCompetition);
  return (dispatch) => {
    fetch(`https://v3.football.api-sports.io/leagues?id=${idCompetition}`, {
      "method": "GET",
      "headers": {
        "X-RapidAPI-Host": host,
        "X-RapidAPI-Key": apiKey,
      }
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data.response);
        dispatch({ type: GET_COMPETITION_DETAIL, payload: data.response })
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export const getCompetitionByCountry = (idCountry) => {
  // console.log(idCountry);
  return (dispatch) => {
    fetch(`https://api-football-v1.p.rapidapi.com/v3/leagues?code=${idCountry}`, {
      "method": "GET",
      "headers": {
        "X-RapidAPI-Host": host,
        "X-RapidAPI-Key": apiKey,
      }
    })
      .then(response => response.json())
      .then((data) => {
        // console.log(data.response);
        dispatch({ type: FILTER_COMP_BY_COUNTRY, payload: data.response })
      })
      .catch(err => {
        console.log(err);
      });
  }
}


// searchbar para buscar solo ligas por ahora

export const searchBar = (nameCompetition) => {
  return async (dispatch) => {
    try {
        await fetch(`https://api-football-v1.p.rapidapi.com/v3/leagues?name=${nameCompetition}`, {
      "method": "GET",
      "headers": {
        "X-RapidAPI-Host": host,
        "X-RapidAPI-Key": apiKey,
      }
    })
      .then(response => response.json())
      .then((data) => {
        // console.log(data.response);
        dispatch({ type: GET_COMPETITION_SEARCHBAR, payload: data.response })
      })
    } catch (error) {
      console.log(error);
      
    }
  }
} 

// export const searchBarCountries = (searching) => {
//   return({
//     type: SEARCH_BAR_COUNTRIES,
//     payload: searching
//   })
// }


export const getTeamSquad = (idTeam) =>{
  return (dispatch) => {
    fetch(`https://api-football-v1.p.rapidapi.com/v3/players/squads?team=${idTeam}`, {
      "method": "GET",
      "headers": {
        "X-RapidAPI-Host": host,
        "X-RapidAPI-Key": apiKey,
      }
    })
      .then(response => response.json())
      .then((data) => {
        // console.log(data.response);
        dispatch({ type: GET_TEAM_SQUAD, payload: data.response })
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export const getTeamStadium = (idTeam) => {
  return (dispatch) => {
    fetch(`https://api-football-v1.p.rapidapi.com/v3/teams?id=${idTeam}`, {
      "method": "GET",
      "headers": {
        "X-RapidAPI-Host": host,
        "X-RapidAPI-Key": apiKey,
      }
    })
      .then(response => response.json())
      .then((data) => {
        // console.log(data.response);
        dispatch({ type: GET_TEAM_STADIUM, payload: data.response })
      })
      .catch(err => {
        console.log(err);
      });
  }
}
// entrenador por id de equipo

export const getCoachByTeam = (idTeam) => {
  return (dispatch) => {
    fetch(`https://api-football-v1.p.rapidapi.com/v3/coachs?team=${idTeam}`, {
      "method": "GET",
      "headers": {
        "X-RapidAPI-Host": host,
        "X-RapidAPI-Key": apiKey,
      }
    })
      .then(response => response.json())
      .then((data) => {
        // console.log(data.response);
        dispatch({ type: GET_TEAM_COACH, payload: data.response })
      })
      .catch(err => {
        console.log(err);
      });
  }
}

// detalle del jugador
export const getPlayer = (idPlayer, season) => {
  return (dispatch) => {
    fetch(`https://api-football-v1.p.rapidapi.com/v3/players?id=${idPlayer}&season=${season}`, {
      "method": "GET",
      "headers": {
        "X-RapidAPI-Host": host,
        "X-RapidAPI-Key": apiKey,
      }
    })
      .then(response => response.json())
      .then((data) => {
        // console.log(data.response);
        dispatch({ type: GET_PLAYER, payload: data.response })
      })
      .catch(err => {
        console.log(err);
      });
  }
}
//

export const getSeasons = () => {
  return (dispatch) => {
    fetch(`https://api-football-v1.p.rapidapi.com/v3/players/seasons`, {
      "method": "GET",
      "headers": {
        "X-RapidAPI-Host": host,
        "X-RapidAPI-Key": apiKey,
      }
    })
      .then(response => response.json())
      .then((data) => {
        // console.log(data.response);
        dispatch({ type: GET_SEASONS, payload: data.response })
      })
      .catch(err => {
        console.log(err);
      });
  }
}


// endpoint para estadisticas del equipo por temporada

export const getTeamStadistics = (idCompetition, idTeam) => {
  return (dispatch) => {
    fetch(`https://api-football-v1.p.rapidapi.com/v3/teams/statistics?league=${idCompetition}&season=${year-1}&team=${idTeam}`, {
      "method": "GET",
      "headers": {
        "X-RapidAPI-Host": host,
        "X-RapidAPI-Key": apiKey,
      }
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data.response);
        dispatch({ type: GET_TEAM_STADISTICS, payload: data.response })
      })
      .catch(err => {
        console.log(err);
      });
  }
}