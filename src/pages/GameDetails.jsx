import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGameDetails,
  fetchGameScreenshots,
  fetchGameTrailers,
} from "../features/games/gamesSlice";
import { useEffect } from "react";

function GameDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedGame, detailStatus, trailers, screenshots, error } =
    useSelector((state) => state.games);

  useEffect(() => {
    dispatch(fetchGameDetails(id));
    dispatch(fetchGameTrailers(id));
    dispatch(fetchGameScreenshots(id));
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

  const {
    name,
    background_image,
    description,
    rating,
    genres,
    platforms,
    released,
    publishers,
    playtime,
  } = selectedGame;

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">{name}</h1>

      <div className="row mb-4">
        <div className="col-md-8 offset-md-2">
          <img
            src={
              background_image ||
              "https://via.placeholder.com/800x400?text=No+Image"
            }
            alt={name}
            className="img-fluid rounded shadow"
          />
        </div>
      </div>

      <div className="mb-4">
        <h5>Description</h5>
        <p dangerouslySetInnerHTML={{ __html: description }}></p>
      </div>

      <ul className="list-group mb-4">
        <li className="list-group-item">
          <strong>Rating:</strong> {rating}
        </li>
        <li className="list-group-item">
          <strong>Released:</strong> {released}
        </li>
        <li className="list-group-item">
          <strong>Publisher:</strong>{" "}
          {publishers?.map((p) => p.name).join(", ") || "N/A"}
        </li>
        <li className="list-group-item">
          <strong>Average Playtime:</strong> {playtime || 0} hours
        </li>
        <li className="list-group-item">
          <strong>Genres:</strong> {genres.map((g) => g.name).join(", ")}
        </li>
        <li className="list-group-item">
          <strong>Platforms:</strong>{" "}
          {platforms.map((p) => p.platform.name).join(", ")}
        </li>
      </ul>

      {trailers.length > 0 ? (
        <div className="mb-5">
          <h5>Trailer</h5>
          <div className="ratio ratio-16x9">
            <video controls className="w-100 rounded shadow-sm">
              <source src={trailers[0].data.max} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      ) : (
        <div className="alert alert-info text-center mb-5">
          No trailer available for this game.
        </div>
      )}

      {screenshots.length > 0 ? (
        <div className="mb-5">
          <h5>Screenshots</h5>
          <div className="d-flex flex-wrap gap-3 justify-content-center">
            {screenshots.map((s) => (
              <img
                key={s.id}
                src={s.image}
                alt="Screenshot"
                className="img-thumbnail shadow-sm"
                style={{ maxWidth: "220px" }}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="alert alert-info text-center mb-5">
          No screenshots available.
        </div>
      )}

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
