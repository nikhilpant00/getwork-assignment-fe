import React, { useState } from "react";

import "./index.scss";
import { FiChevronDown } from "react-icons/fi";
import { FiChevronUp } from "react-icons/fi";

function DropDown({ data, isOpen, checkedFilters, onCheckboxChange }) {
  const [isDown, setIsDown] = useState(isOpen);

  const handleCheckboxClick = (id, name) => {
    onCheckboxChange(id, name);
  };

  return (
    <div className="drop-down">
      <div className="title" onClick={() => setIsDown((prev) => !prev)}>
        <h5>{data?.heading}</h5>
        {isDown && data?.data?.length ? <FiChevronUp /> : <FiChevronDown />}
      </div>
      {isDown && data?.data?.length > 0 && (
        <div className="drop-items">
          <ul>
            {data?.data?.slice(0, 4).map((value) => (
              <div className="item" key={value.id}>
                <span>
                  <input
                    type="checkbox"
                    checked={checkedFilters.some(
                      (item) => item.id === value.id
                    )}
                    onChange={() =>
                      handleCheckboxClick(value.id, data?.param_name)
                    }
                  />
                </span>
                <p>{value.name}</p>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DropDown;
