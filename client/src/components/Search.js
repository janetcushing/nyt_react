import React from "react";

const Search = props =>
  <form>
    <div className="form-group">
      <label htmlForm="search">Search:</label>
      <input
        onChange={props.handleInputChange}
        value={props.value}
        name="search"
        type="text"
        className="form-control"
        placeholder="Search For a Subject"
        id="search"
      />
      <label htmlForm="search">Number of Records to Retrieve:</label>
        <input
        onChange={props.handleInputChange}
        value={props.value}
        name="numRecs"
        type="text"
        className="form-control"
        placeholder="5"
        id="numRecs"
      />
      <label htmlForm="search">Start Year:</label>
            <input
        onChange={props.handleInputChange}
        value={props.value}
        name="start-year"
        type="text"
        className="form-control"
        placeholder=""
        id="start-year"
      />
      <label htmlForm="search">End Year:</label>
                 <input
        onChange={props.handleInputChange}
        value={props.value}
        name="end-year"
        type="text"
        className="form-control"
        placeholder=""
        id="end-year"
      />
      <br />
      <button id="searchBtn" onClick={props.handleFormSubmit} className="btn btn-primary">
        Search
      </button>
      <button id="clearBtn" onClick={props.handleFormSubmit} className="btn btn-primary">
        Clear Results
      </button>
    </div>
  </form>;

console.log(Search);
export default Search;
