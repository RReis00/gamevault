import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  removeFavorite,
} from "../features/favorites/favoritesSlice";
import { Link } from "react-router-dom";

function GameCard({ game }) {
  const dispatch = useDispatch();

  // Get current list of favorites from Redux
  const favorites = useSelector((state) => state.favorites.list);

  // Check if this game is already in favorites
  const isFavorite = favorites.some((fav) => fav.id === game.id);

  /**
   * Handle click on the "Add/Remove Favorite" button.
   * - Prevents link navigation when clicking the button
   * - Removes focus (blur) from the button for nicer UX
   * - Dispatches add/remove depending on current state
   */
  const handleClick = (e) => {
    e.preventDefault(); // Prevent navigating via <Link>
    e.stopPropagation(); // Stop bubbling to parent

    // Remove button focus (optional UX improvement)
    if (e.currentTarget?.blur) e.currentTarget.blur();

    if (isFavorite) {
      dispatch(removeFavorite(game.id));
    } else {
      dispatch(addFavorite(game));
    }
  };

  return (
    // Entire card is a link to the game details page
    <Link to={`/game/${game.id}`} className="text-decoration-none">
      <div className="card h-100 shadow-sm app-card">
        {/* Game image */}
        <img
          src={game.background_image}
          className="card-img-top"
          alt={game.name}
          style={{ objectFit: "cover", height: "200px" }}
        />

        {/* Card content */}
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 className="card-title">{game.name}</h5>
            <p className="card-text mb-1">
              <span className="badge badge-soft">Rating: {game.rating}</span>
            </p>
          </div>

          {/* Favorite toggle button */}
          <button
            className={`btn ${
              isFavorite ? "btn-accent" : "btn-outline-accent"
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
  game: PropTypes.object.isRequired, // must be a game object with id, name, background_image, rating, etc.
};

export default GameCard;
