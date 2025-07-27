import PropTypes from "prop-types";

function GameCard({ game }) {
  return (
    <div className="card h-100 shadow-sm">
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
        <button className="btn btn-outline-primary mt-2">Add Favorite</button>
      </div>
    </div>
  );
}

GameCard.PropTypes = {
  game: PropTypes.object.isRequired,
};

export default GameCard;
