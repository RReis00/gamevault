import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularGames } from "../features/games/gamesSlice";
import GameCard from "../components/GameCard";

function Home() {
  const dispatch = useDispatch();
  const { popular, status, error } = useSelector((state) => state.games);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPopularGames());
    }
  }, [dispatch, status]);

  return (
    <div>
      <h1 className="text-center mb-4"> Popular Games</h1>

      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}

      <div className="row">
        {popular.map((game) => (
          <div key={game.id} className="col-md-4 mb-4">
            <GameCard game={game} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
