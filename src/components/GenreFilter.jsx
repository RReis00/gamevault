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

  const handleSelect = ({ slug, name }) => {
    if (selected === slug) return;
    setSelected(slug);
    onSelectGenre({ slug, name });
  };
  console.log("Selected genre:", selected);

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
        className={`genre-button ${selected === null ? "active" : ""}`}
        onClick={() => handleSelect({ slug: null, name: "All" })}
      >
        All
      </button>
      {genres.map((genre) => (
        <button
          key={genre.id}
          className={`genre-button ${selected === genre.slug ? "active" : ""}`}
          onClick={() => handleSelect({ slug: genre.slug, name: genre.name })}
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
