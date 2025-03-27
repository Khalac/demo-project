import React from "react";
import "./NameFilter.scss";

type NameFilterProps = {
  setInput: React.Dispatch<React.SetStateAction<string>>;
};

const NameFilter = ({ setInput }: NameFilterProps) => {
  return (
    <div className="filter-group">
      <label className="filter-group__label">Name: </label>
      <input
        type="text"
        className="filter-group__input"
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
};

export default NameFilter;
