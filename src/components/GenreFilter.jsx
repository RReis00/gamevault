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

  if (status === "loading") return <p>Loading genres...</p>;
  if (status === "failed") return <p className="text-danger">{error}</p>;

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
