import PropTypes from "prop-types";
import { useState } from "react";

function SearchBar({ onSearch }) {
  const [term, setTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term.trim() !== "") {
      onSearch(term);
    }
  };
  return (
    <form
      className="d-flex justify-content-center mb-4"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="form-control w-50 me-2"
        placeholder="Search games..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <button className="btn btn-dark" type="submit">
        Search
      </button>
    </form>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
