import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGameDetails } from "../features/games/gamesSlice";
import { useEffect } from "react";

function GameDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedGame, detailStatus, error } = useSelector(
    (state) => state.games
  );

  useEffect(() => {
    dispatch(fetchGameDetails(id));
  }, [dispatch, id]);

  if (detailStatus === "loading")
    return <p className="text-center">Loading game...</p>;
  if (detailStatus === "failed")
    return <p className="text-danger text-center">{error}</p>;
  if (!selectedGame) return null;

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">{selectedGame.name}</h1>
      <img
        src={selectedGame.background_image}
        alt={selectedGame.name}
        className="img-fluid mb-3"
      />
      <p dangerouslySetInnerHTML={{ __html: selectedGame.description }}></p>
      <p>
        <strong>Rating:</strong> {selectedGame.rating}
      </p>
      <p>
        <strong>Genres:</strong>{" "}
        {selectedGame.genres.map((g) => g.name).join(", ")}
      </p>
      <p>
        <strong>Platforms:</strong>{" "}
        {selectedGame.platforms.map((p) => p.platform.name).join(", ")}
      </p>
      <button
        className="btn btn-secondary mb-4"
        onClick={() => window.history.back()}
      >
        Voltar
      </button>
    </div>
  );
}

export default GameDetails;
