import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import locationContext from "./components/contextApi/userLocation";
import searchFilter from "./components/contextApi/searchCriteria";

import "./App.css";

import Home from "./components/pages/home/Home";
import MovieDetails from "./components/pages/moviedetails/MovieDetails";
import SeatingLayout from "./components/sets/SeatingLayout";

import Profile from "./components/pages/userprofile/Profile";
import UserProfile from "./components/pages/userprofile/UserProfile";
import Bookings from "./components/pages/userprofile/bookings/Bookings";
import Favourites from "./components/pages/userprofile/favourites/Favourites";
import ChangePassword from "./components/pages/userprofile/changePassword/ChangePassword";

function App() {

  const [location, setLocation] = useState("Hyderabad");
  const [search, setSearch] = useState("")

  return (
    <locationContext.Provider value={{ location, setLocation }}>
      <searchFilter.Provider value={{search, setSearch}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/moviedetails/:movieId" element={<MovieDetails />} />
          <Route path="/buytickets" element={<SeatingLayout />} />
          <Route path="/profile" element={<Profile />}>
            <Route path="" element={<Navigate to="details" />} />
            <Route path="details" element={<UserProfile />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="favourites" element={<Favourites />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
        </Routes>
      </searchFilter.Provider>
    </locationContext.Provider>
  )
}

export default App;

// Joining data: 07/sept/2021
// 9I Web Solution: 25 months = 2.1
// Perfex = 13 months = 1.1