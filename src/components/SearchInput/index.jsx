import { IoSearchOutline } from "react-icons/io5";

import "./index.scss";

// const SearchInput = () => {
//   return (
//     <div className="search-container">
//       <IoSearchOutline className="search-icon" />
//       <input type="text" placeholder="Search" className="search-input" />
//     </div>
//   );
// };

// export default SearchInput;

import React, { useState } from "react";
import CustomCheckbox from "../CustomCheckBox";

const SearchInput = ({ data, checkedFilters, onCheckboxChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const filters = data?.data;

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  console.log(filters);
  const filteredFilters = filters.filter((filter) =>
    filter.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [isOpenList, setIsOpenList] = useState(false);

  return (
    <>
      <div className="search-container">
        <IoSearchOutline className="search-icon" />
        <input
          type="text"
          placeholder="Search"
          className="search-input"
          value={searchTerm}
          onChange={handleSearchChange}
          onClick={() => setIsOpenList((prev) => !prev)}
        />
      </div>
      {filters.length > 0 ? (
        <div className={`filter-list ${isOpenList ? "open-list" : ""}`}>
          {filteredFilters.map((filter) => (
            <div key={filter.id}>
              <CustomCheckbox
                label={filter.name}
                isChecked={checkedFilters.some((item) => item.id === filter.id)}
                onChange={(isChecked) => {
                  onCheckboxChange(filter.id, data.param_name);
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{ height: "max-content" }}
          className={`filter-list ${isOpenList ? "open-list" : ""}`}
        >
          <p>No Options</p>
        </div>
      )}
    </>
  );
};

export default SearchInput;
