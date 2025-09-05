import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenres } from "../features/genres/genreSlice";
import PropTypes from "prop-types";

function GenreFilter({ onSelectGenre }) {
  const dispatch = useDispatch();

  // Select genre data from Redux
  const { list: genres, status, error } = useSelector((state) => state.genres);

  // Track which genre is currently selected (by slug)
  const [selected, setSelected] = useState(null);

  /**
   * On mount (or whenever status is "idle"):
   * dispatch fetchGenres() to load the list of genres.
   */
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchGenres());
    }
  }, [dispatch, status]);

  /**
   * Handle when a genre button is clicked:
   * - If already selected, do nothing
   * - Otherwise, update local state and notify parent via onSelectGenre
   */
  const handleSelect = ({ slug, name }) => {
    if (selected === slug) return;
    setSelected(slug);
    onSelectGenre({ slug, name });
  };

  // Show loading spinner
  if (status === "loading")
    return (
      <div className="text-center mt-3">
        <div className="spinner-border text-accent" role="status" />
        <p className="mt-2">Loading genres...</p>
      </div>
    );

  // Show error alert
  if (status === "failed")
    return (
      <div className="alert alert-danger-soft text-center mt-3" role="alert">
        ⚠️ Error loading genres: <strong>{error}</strong>
      </div>
    );

  // Otherwise show genre buttons
  return (
    <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
      {/* "All" option (null slug) */}
      <button
        className={`genre-chip ${selected === null ? "active" : ""}`}
        onClick={() => handleSelect({ slug: null, name: "All" })}
      >
        All
      </button>

      {/* Render one button per genre from API */}
      {genres.map((genre) => (
        <button
          key={genre.id}
          className={`genre-chip ${selected === genre.slug ? "active" : ""}`}
          onClick={() => handleSelect({ slug: genre.slug, name: genre.name })}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
}

GenreFilter.propTypes = {
  // Parent must provide a callback to handle genre selection
  onSelectGenre: PropTypes.func.isRequired,
};

export default GenreFilter;
