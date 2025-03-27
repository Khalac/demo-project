import { ReactNode } from "react";
import "./OptionFilter.scss";

type OptionFilterProps = {
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  children: ReactNode;
  label: string;
};

const OptionFilter = ({ children, setValue, label }: OptionFilterProps) => {
  return (
    <div className="filter-group">
      <label className="filter-group__label">{label}: </label>
      <select
        className="filter-group__select"
        onChange={(e) => setValue && setValue(e.target.value)}
      >
        {children}
      </select>
    </div>
  );
};

export default OptionFilter;
