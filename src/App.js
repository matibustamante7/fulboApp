import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Countries from "./components/Countries/Countries.jsx";
import Transfers from "./components/Transfers/Transfers.jsx";
import SubHeader from "./components/SubHeader/SubHeader.jsx";
import Header from "./components/Header/Header.jsx";
import './app.css'
import Competitions from "./components/Competitions/Competitions.jsx";
import Home from "./components/Home/Home.jsx";
import Footer from "./components/Footer/Footer.jsx";
import CardCompetitionDetail from "./components/CardCompetitionDetail/CardCompetitionDetail.jsx";
import MatchDetail from "./components/Matchs/MatchDetail/MatchDetail.jsx";
import LeaguesXCountry from "./components/Countries/LeaguesXCountry/LeaguesXCountry.jsx";

function App() {

  return (
    <div className="App">
      <Header/>
      <SubHeader />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/competitions" element={<Competitions />} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/countries/:idCountry" element={<LeaguesXCountry />} />
        <Route path="/transfers" element={<Transfers />} />
        <Route path="/competitions" element={<Competitions />} />
        <Route path="/competitions/:idCompetition" element={<CardCompetitionDetail />} />
        <Route path="/:idMatch" element={<MatchDetail />} />
      </Routes>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
