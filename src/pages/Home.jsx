import { useEffect, useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGames, resetGamesState } from "../features/games/gamesSlice";
import GameCard from "../components/GameCard";
import SearchBar from "../components/SearchBar";
import GenreFilter from "../components/GenreFilter";

function Home() {
  const dispatch = useDispatch();
  const { list, status, error, hasMore, page, mode, query, genre } =
    useSelector((state) => state.games);

  const [titleGenre, setTitleGenre] = useState("All");
  const observer = useRef();

  useEffect(() => {
    setTitleGenre("All");
    dispatch(resetGamesState());
    dispatch(fetchGames({ mode: "popular", page: 1 }));
  }, [dispatch]);

  const lastGameRef = useCallback(
    (node) => {
      if (status === "loading") return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch(
            fetchGames({
              mode,
              query,
              genre,
              page: page + 1,
            })
          );
        }
      });
      if (node) observer.current.observe(node);
    },
    [dispatch, hasMore, mode, query, genre, page, status]
  );

  const handleSearch = (term) => {
    setTitleGenre(`Search: "${term}"`);
    dispatch(resetGamesState());
    dispatch(fetchGames({ mode: "search", query: term, page: 1 }));
  };

  const handleGenreSelect = ({ slug, name }) => {
    setTitleGenre(name || "All");
    dispatch(resetGamesState());
    if (!slug) {
      dispatch(fetchGames({ mode: "popular", page: 1 }));
    } else {
      dispatch(fetchGames({ mode: "genre", genre: slug, page: 1 }));
    }
  };

  return (
    <div>
      <h1 className="text-center mb-4"> {titleGenre} Games</h1>
      <SearchBar onSearch={handleSearch} />
      <GenreFilter onSelectGenre={handleGenreSelect} />

      {status === "loading" && list.length === 0 && (
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
      {status === "succeeded" && list.length === 0 && (
        <div className="alert alert-warning text-center mt-4" role="alert">
          We did not find any games for this search. 😕
        </div>
      )}

      <div className="row">
        {list.map((game, index) => {
          const isLast = index === list.length - 1;
          return (
            <div
              key={game.id}
              className="col-md-4 mb-4"
              ref={isLast ? lastGameRef : null}
            >
              <GameCard game={game} />
            </div>
          );
        })}
      </div>

      {status === "loading" && list.length > 0 && (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status" />
        </div>
      )}
    </div>
  );
}

export default Home;
