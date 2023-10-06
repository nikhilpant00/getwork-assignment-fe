import React, { useState } from "react";

const CustomCheckbox = ({ label, isChecked, onChange }) => {
  const toggleCheckbox = () => {
    onChange(!isChecked);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <input type="checkbox" checked={isChecked} onChange={toggleCheckbox} />

      <p style={{ marginLeft: "10px" }}> {label}</p>
    </div>
  );
};

export default CustomCheckbox;
