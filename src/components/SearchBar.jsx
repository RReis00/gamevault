import PropTypes from "prop-types";
import { useState } from "react";

function SearchBar({ onSearch }) {
  // Local state for the input value
  const [term, setTerm] = useState("");

  /**
   * Handle form submission.
   * - Prevents default reload behavior
   * - Only triggers search if the term is not empty/whitespace
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (term.trim() !== "") {
      onSearch(term);
      setTerm("");
    }
  };

  return (
    <form
      className="d-flex justify-content-center mb-4"
      onSubmit={handleSubmit}
    >
      {/* Controlled input field */}
      <input
        type="text"
        className="form-control w-50 me-2 input-accent"
        placeholder="Search games..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />

      {/* Submit button */}
      <button className="btn btn-accent" type="submit">
        Search
      </button>
    </form>
  );
}

SearchBar.propTypes = {
  // Parent must provide a callback that receives the search term
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
