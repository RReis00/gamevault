import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import Favorites from "../pages/Favorites";
import GameDetails from "../pages/GameDetails";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/game/:id" element={<GameDetails />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
