import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  removeFavorite,
} from "../features/favorites/favoritesSlice";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function GameCard({ game }) {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.list);

  const isFavorite = favorites.some((fav) => fav.id === game.id);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      dispatch(removeFavorite(game.id));
    } else {
      dispatch(addFavorite(game));
    }
  };

  return (
    <Link to={`/game/${game.id}`} className="text-decoration-none">
      <div
        className={`card h-100 shadow-sm ${
          theme === "dark" ? "bg-dark text-light" : ""
        }`}
      >
        <img
          src={game.background_image}
          className="card-img-top"
          alt={game.name}
          style={{ objectFit: "cover", height: "200px" }}
        />
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 className="card-title">{game.name}</h5>
            <p className="card-text mb-1">Rating: {game.rating}</p>
          </div>
          <button
            className={`btn ${
              isFavorite
                ? "btn-danger"
                : theme === "dark"
                ? "btn-outline-light"
                : "btn-outline-dark"
            } mt-2`}
            onClick={handleClick}
          >
            {isFavorite ? "Remove Favorite" : "Add Favorite"}
          </button>
        </div>
      </div>
    </Link>
  );
}

GameCard.propTypes = {
  game: PropTypes.object.isRequired,
};

export default GameCard;
