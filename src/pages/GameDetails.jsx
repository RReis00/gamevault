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

  if (detailStatus === "loading") {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-2">Loading game details...</p>
      </div>
    );
  }

  if (detailStatus === "failed") {
    return (
      <div className="alert alert-danger text-center mt-5" role="alert">
        ❌ Error loading game details: <strong>{error}</strong>
      </div>
    );
  }

  if (!selectedGame) return null;

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">{selectedGame.name}</h1>

      <div className="row mb-4">
        <div className="col-md-8 offset-md-2">
          <img
            src={
              selectedGame.background_image ||
              "https://via.placeholder.com/800x400?text=No+Image"
            }
            alt={selectedGame.name}
            className="img-fluid rounded shadow"
          />
        </div>
      </div>

      <div className="mb-4">
        <h5>Description</h5>
        <p dangerouslySetInnerHTML={{ __html: selectedGame.description }}></p>
      </div>

      <ul className="list-group mb-4">
        <li className="list-group-item">
          <strong>Rating:</strong> {selectedGame.rating}
        </li>
        <li className="list-group-item">
          <strong>Genres:</strong>{" "}
          {selectedGame.genres.map((g) => g.name).join(", ")}
        </li>
        <li className="list-group-item">
          <strong>Platforms:</strong>{" "}
          {selectedGame.platforms.map((p) => p.platform.name).join(", ")}
        </li>
      </ul>
      <div className="text-center">
        <button
          className="btn btn-secondary mb-4"
          onClick={() => window.history.back()}
        >
          Voltar
        </button>
      </div>
    </div>
  );
}

export default GameDetails;
