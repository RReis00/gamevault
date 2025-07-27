import { useSelector } from "react-redux";
import GameCard from "../components/GameCard";

function Favorites() {
  const favorites = useSelector((state) => state.favorites.list);

  return (
    <div className="text-center mt-5">
      <h1 className="text-center mb-4">Favorites</h1>
      {favorites.length === 0 ? (
        <p className="text-center">No Favorite games yet</p>
      ) : (
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
