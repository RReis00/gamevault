import { useSelector } from "react-redux";
import GameCard from "../components/GameCard";

function Favorites() {
  // Get favorites list from Redux store
  const favorites = useSelector((state) => state.favorites.list);

  return (
    <div className="text-center mt-5">
      <h1 className="text-center mb-4 page-title">Favorites</h1>

      {/* Empty state: show a message if no favorites */}
      {favorites.length === 0 ? (
        <p className="text-center">No Favorite games yet</p>
      ) : (
        // Grid of favorite games
        <div className="row">
          {favorites.map((game) => (
            <div key={game.id} className="col-md-4 mb-4">
              <GameCard game={game} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
