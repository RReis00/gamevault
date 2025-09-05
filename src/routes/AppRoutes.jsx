import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import Favorites from "../pages/Favorites";
import GameDetails from "../pages/GameDetails";

function AppRoutes() {
  return (
    <Routes>
      {/* 
        Root route uses <Layout>, which typically renders shared UI 
        (navbar, footer, theme wrapper) and an <Outlet> for child pages. 
      */}
      <Route path="/" element={<Layout />}>
        {/* Index route (default child) → Home page */}
        <Route index element={<Home />} />

        {/* Favorites page at /favorites */}
        <Route path="/favorites" element={<Favorites />} />

        {/* Dynamic route for a specific game, /game/123 */}
        <Route path="/game/:id" element={<GameDetails />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
