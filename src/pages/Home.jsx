import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPopularGames,
  searchGames,
  fetchGamesByGenre,
} from "../features/games/gamesSlice";
import GameCard from "../components/GameCard";
import SearchBar from "../components/SearchBar";
import GenreFilter from "../components/GenreFilter";

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

  const handleGenreSelect = (genreSlug) => {
    dispatch(genreSlug ? fetchGamesByGenre(genreSlug) : fetchPopularGames());
  };

  return (
    <div>
      <h1 className="text-center mb-4"> Popular Games</h1>
      <SearchBar onSearch={handleSearch} />
      {status !== "loading" && (
        <div className="text-center mb-3">
          <button
            className="btn btn-outline-secondary"
            onClick={() => dispatch(fetchPopularGames())}
          >
            🔄 Popular Games
          </button>
        </div>
      )}
      <GenreFilter onSelectGenre={handleGenreSelect} />

      {status === "loading" && (
        <div className="text-center mt-4">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-2">Loading games...</p>
        </div>
      )}
      {status === "failed" && (
        <div className="alert alert-danger text-center mt-4" role="alert">
          ❌ Error loading games: <strong>{error}</strong>
          Please try again later.
        </div>
      )}
      {status === "succeeded" && popular.length === 0 && (
        <div className="alert alert-warning text-center mt-4" role="alert">
          We did not find any games for this search. 😕
        </div>
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
