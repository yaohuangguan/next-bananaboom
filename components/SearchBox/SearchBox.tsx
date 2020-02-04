import React from "react";

const SearchBox = ({ handleChange, searchField }) => {
  return (
    <div className="text-center">
      <label htmlFor="searchBlog">
      
        <input
          value={searchField}
          type="search"
          className="search px-3 py-3 my-3 text-center"
          placeholder="Search"
          onChange={handleChange}
        />
      </label>
      <style jsx>{`
        .search {
          box-shadow:none;
          border-radius: 50px;
          width: 50vw;
          color: #2eca6a;
        }
        .search:focus {
          border:none;
          outline:none;
          border: 2px solid #2eca6a;
          border-color: #2eca6a;
          box-shadow: none;
        }
      `}</style>
    </div>
  );
};

export default SearchBox;
