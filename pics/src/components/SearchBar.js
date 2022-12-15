import "./SearchBar.css";
import { useState } from "react";

function SearchBar({ onSubmit }) {
  const [term, setTerm] = useState("");
  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSubmit(term);
    //NEVER WRITE CODE LIKE BELOW IN REACT
    //document.querySelector('input').value
  };

  const handleChange = (event) => {
    setTerm(event.target.value);
  };
  return (
    <div className="search-bar">
      <form onSubmit={handleFormSubmit}>
        <label>Enter search term</label>
        <input value={term} onChange={handleChange} />
      </form>
    </div>
  );
}

export default SearchBar;
