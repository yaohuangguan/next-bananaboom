const SearchBox = ({ handleChange, searchField }) => {
  return (
    <div className="text-center">
      <label htmlFor="searchBlog">
        <input
          value={searchField}
          type="search"
          className="search px-3 py-3 my-3 text-center"
          placeholder="Search Blog List"
          onChange={handleChange}
        />
      </label>
      <style jsx>{`
        .search {
          font-size: 1.1rem;
          font-weight: 300;
          display: inline-block;
          border-color: transparent;
          border-bottom-color:#DFD0F0;
          background-color: transparent;
          outline:none;
          box-shadow: none;
          width:50vw
        }
        .search:focus {
          border-bottom-color:rgb(158, 91, 235);
        }
      `}</style>
    </div>
  );
};

export default SearchBox;
