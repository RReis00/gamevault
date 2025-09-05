import { useEffect, useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGames, resetGamesState } from "../features/games/gamesSlice";
import GameCard from "../components/GameCard";
import SearchBar from "../components/SearchBar";
import GenreFilter from "../components/GenreFilter";

function Home() {
  const dispatch = useDispatch();

  // Select game-related state from Redux
  const { list, status, error, hasMore, page, mode, query, genre } =
    useSelector((state) => state.games);

  // Title above the grid (e.g., "All", `Search: "term"`, or a genre name)
  const [titleGenre, setTitleGenre] = useState("All");

  // Holds the IntersectionObserver instance
  const observer = useRef();

  // On mount: set default title, reset state, and load the first page of "popular" games
  useEffect(() => {
    setTitleGenre("All");
    dispatch(resetGamesState());
    dispatch(fetchGames({ mode: "popular", page: 1 }));
  }, [dispatch]);

  /**
   * Callback ref for the last game card.
   * - Disconnects any previous observer.
   * - Creates a new observer that, when the last card is visible and we still have more data,
   *   dispatches a fetch for the next page with the current listing context (mode/query/genre).
   */
  const lastGameRef = useCallback(
    (node) => {
      // Avoid triggering while a page is already loading
      if (status === "loading") return;

      // Disconnect an existing observer (prevents multiple observers)
      if (observer.current) observer.current.disconnect();

      // Create the observer and define its callback
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch(
            fetchGames({
              mode,
              query,
              genre,
              page: page + 1, // request the next page
            })
          );
        }
      });

      // If we have a DOM node for the last card, start observing it
      if (node) observer.current.observe(node);
    },
    [dispatch, hasMore, mode, query, genre, page, status]
  );

  /**
   * Handle a new search term:
   * - Update the title
   * - Reset the list/pagination
   * - Fetch the first page in "search" mode
   */
  const handleSearch = (term) => {
    setTitleGenre(`Search: "${term}"`);
    dispatch(resetGamesState());
    dispatch(fetchGames({ mode: "search", query: term, page: 1 }));
  };

  /**
   * Handle selecting a genre from the chip list:
   * - Update the title
   * - Reset state
   * - If "All" (no slug), go back to popular; otherwise load the selected genre
   */
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
      <h1 className="text-center mb-4 page-title"> {titleGenre} Games</h1>

      {/* Search input */}
      <SearchBar onSearch={handleSearch} />

      {/* Genre chips */}
      <GenreFilter onSelectGenre={handleGenreSelect} />

      {/* Initial loading spinner (only when list is still empty) */}
      {status === "loading" && list.length === 0 && (
        <div className="text-center mt-4">
          <div className="spinner-border text-accent" role="status" />
          <p className="mt-2">Loading games...</p>
        </div>
      )}

      {/* Error state */}
      {status === "failed" && (
        <div className="alert alert-danger-soft text-center mt-4" role="alert">
          ❌ Error loading games: <strong>{error}</strong>
          Please try again later.
        </div>
      )}

      {/* Empty state (request succeeded but no results) */}
      {status === "succeeded" && list.length === 0 && (
        <div className="alert alert-warning-soft text-center mt-4" role="alert">
          We did not find any games for this search. 😕
        </div>
      )}

      {/* Grid of game cards; attach the observer ref to the *last* item */}
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

      {/* Bottom loader (for subsequent pages) */}
      {status === "loading" && list.length > 0 && (
        <div className="text-center my-4">
          <div className="spinner-border text-accent" role="status" />
        </div>
      )}
    </div>
  );
}

export default Home;
