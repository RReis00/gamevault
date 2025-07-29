import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenres } from "../features/genres/genreSlice";
import PropTypes from "prop-types";

function GenreFilter({ onSelectGenre }) {
  const dispatch = useDispatch();
  const { list: genres, status, error } = useSelector((state) => state.genres);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchGenres());
    }
  }, [dispatch, status]);

  const handleSelect = (genreSlug) => {
    if (selected === genreSlug) return;
    setSelected(genreSlug);
    onSelectGenre(genreSlug);
  };

  if (status === "loading")
    return (
      <div className="text-center mt-3">
        <div className="spinner-border text-secondary" role="status" />
        <p className="mt-2">Loading genres...</p>
      </div>
    );
  if (status === "failed")
    return (
      <div className="alert alert-danger text-center mt-3" role="alert">
        ⚠️ Error loading genres: <strong>{error}</strong>
      </div>
    );

  return (
    <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
      <button
        className={`btn btn-sm ${
          selected === null ? "btn-primary" : "btn-outline-secondary"
        }`}
        onClick={() => handleSelect(null)}
      >
        All
      </button>
      {genres.map((genre) => (
        <button
          key={genre.id}
          className={`btn btn-sm ${
            selected === genre.slug ? "btn-primary" : "btn-outline-secondary"
          }`}
          onClick={() => handleSelect(genre.slug)}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
}

GenreFilter.propTypes = {
  onSelectGenre: PropTypes.func.isRequired,
};

export default GenreFilter;
