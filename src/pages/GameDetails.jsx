import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGameDetails,
  fetchGameScreenshots,
  fetchGameTrailers,
} from "../features/games/gamesSlice";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // ← SVG icons (no emoji)

function GameDetails() {
  // Local UI state for lightbox navigation
  const [selectedScreenshot, setSelectedScreenshot] = useState(null); // active screenshot URL
  const [screenshotIndex, setScreenshotIndex] = useState(0); // active screenshot index

  // Game ID from the route
  const { id } = useParams();
  const dispatch = useDispatch();

  // Grab relevant state from Redux
  const { selectedGame, detailStatus, trailers, screenshots, error } =
    useSelector((state) => state.games);

  /**
   * On mount or when the ID changes:
   * - Fetch details, trailers, and screenshots
   * - Reset lightbox state
   */
  useEffect(() => {
    dispatch(fetchGameDetails(id));
    dispatch(fetchGameTrailers(id));
    dispatch(fetchGameScreenshots(id));
    setSelectedScreenshot(null);
    setScreenshotIndex(0);
  }, [dispatch, id]);

  // Loading state for details
  if (detailStatus === "loading") {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-accent" role="status" />
        <p className="mt-2">Loading game details...</p>
      </div>
    );
  }

  // Error state for details
  if (detailStatus === "failed") {
    return (
      <div className="alert alert-danger-soft text-center mt-5" role="alert">
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

  // Go to previous screenshot (wrap-around)
  const showPrevScreenshot = (e) => {
    e.stopPropagation();
    const nextIndex =
      screenshotIndex === 0 ? screenshots.length - 1 : screenshotIndex - 1;
    setScreenshotIndex(nextIndex);
    setSelectedScreenshot(screenshots[nextIndex].image);
  };

  // Go to next screenshot (wrap-around)
  const showNextScreenshot = (e) => {
    e.stopPropagation();
    const nextIndex =
      screenshotIndex === screenshots.length - 1 ? 0 : screenshotIndex + 1;
    setScreenshotIndex(nextIndex);
    setSelectedScreenshot(screenshots[nextIndex].image);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 page-title">{name}</h1>

      {/* Hero image */}
      <div className="row mb-4">
        <div className="col-md-8 offset-md-2">
          <img
            src={
              background_image ||
              "https://via.placeholder.com/800x400?text=No+Image"
            }
            alt={name}
            className="img-fluid rounded shadow app-image"
          />
        </div>
      </div>

      {/* RAWG returns HTML; we render it as-is */}
      <div className="mb-4">
        <h5 className="section-title">Description</h5>
        <p dangerouslySetInnerHTML={{ __html: description }}></p>
      </div>

      {/* Facts list */}
      <ul className="list-group mb-4 list-neutral">
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
          <strong>Genres:</strong> {genres?.map((g) => g.name).join(", ")}
        </li>
        <li className="list-group-item">
          <strong>Platforms:</strong>{" "}
          {platforms?.map((p) => p.platform.name).join(", ")}
        </li>
      </ul>

      {/* Trailer */}
      {trailers.length > 0 ? (
        <div className="mb-5">
          <h5 className="section-title">Trailer</h5>
          <div className="ratio ratio-16x9">
            <video controls className="w-100 rounded shadow-sm">
              <source src={trailers[0]?.data?.max} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      ) : (
        <div className="alert alert-info-soft text-center mb-5">
          No trailer available for this game.
        </div>
      )}

      {/* Screenshots */}
      {screenshots.length > 0 ? (
        <div className="mb-5">
          <h5 className="section-title">Screenshots</h5>
          <div className="d-flex flex-wrap gap-3 justify-content-center">
            {screenshots.map((s, index) => (
              <img
                key={s.id}
                src={s.image}
                alt="Screenshot"
                className="img-thumbnail shadow-sm thumb-image"
                style={{ maxWidth: "220px", cursor: "pointer" }}
                onClick={() => {
                  setSelectedScreenshot(s.image);
                  setScreenshotIndex(index);
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="alert alert-info-soft text-center mb-5">
          No screenshots available.
        </div>
      )}

      {/* Lightbox overlay */}
      {selectedScreenshot && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(5px)",
            zIndex: 1050,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setSelectedScreenshot(null)}
        >
          {/* Current screenshot */}
          <img
            src={selectedScreenshot}
            alt="Expanded Screenshot"
            className="img-fluid rounded shadow-lg"
            style={{
              maxHeight: "90%",
              maxWidth: "90%",
              border: "4px solid white",
            }}
            onClick={(e) => e.stopPropagation()}
          />

          {/* Close button (unchanged visual) */}
          <button
            type="button"
            onClick={() => setSelectedScreenshot(null)}
            className="btn btn-light position-absolute top-0 end-0 m-4 fs-4"
            aria-label="Close lightbox"
          >
            ✖
          </button>

          {/* Left arrow button */}
          <button
            type="button"
            onClick={showPrevScreenshot}
            className="btn btn-light lightbox-arrow position-absolute start-0 top-50 translate-middle-y m-4 fs-4"
            aria-label="Previous screenshot"
          >
            <ChevronLeft />
          </button>

          {/* Right arrow button */}
          <button
            type="button"
            onClick={showNextScreenshot}
            className="btn btn-light lightbox-arrow position-absolute end-0 top-50 translate-middle-y m-4 fs-4"
            aria-label="Next screenshot"
          >
            <ChevronRight />
          </button>
        </div>
      )}

      {/* Back button */}
      <div className="text-center">
        <button
          className="btn btn-outline-accent mb-4"
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default GameDetails;
