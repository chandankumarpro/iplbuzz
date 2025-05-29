import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Nav from '../Nav/Nav'
import Home from '../../pages/Home/Home'
import Teams from '../../pages/Teams/Teams'
import PlayerProfileCard from '../../pages/Teams/players/PlayerProfileCard'

const AppRoutes = () => {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/teams/:name?' element={<Teams />}/>
        <Route path='/players/:name?' element={<PlayerProfileCard />}/>
      </Routes>
    </Router>
  )
}

export default AppRoutes