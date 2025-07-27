import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularGames, searchGames } from "../features/games/gamesSlice";
import GameCard from "../components/GameCard";
import SearchBar from "../components/SearchBar";

function Home() {
  const dispatch = useDispatch();
  const { popular, status, error } = useSelector((state) => state.games);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPopularGames());
    }
  }, [dispatch, status]);

  const handleSearch = (term) => {
    dispatch(searchGames(term));
  };

  return (
    <div>
      <h1 className="text-center mb-4"> Popular Games</h1>
      <SearchBar onSearch={handleSearch} />
      {status === "succeeded" && (
        <div className="text-center mb-3">
          <button
            className="btn btn-outline-secondary"
            onClick={() => dispatch(fetchPopularGames())}
          >
            🔄 Popular Games
          </button>
        </div>
      )}

      {status === "loading" && <p className="text-center">Loading...</p>}
      {status === "failed" && (
        <p className="text-center text-danger">Error: {error}</p>
      )}
      {status === "succeeded" && popular.length === 0 && (
        <p className="text-center">No results found.</p>
      )}

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
