import { DataFetchType } from "@/types/dataFetch";
import "./SearchResultItem.scss";
import { useNavigate } from "react-router-dom";

type SearchResultListProps = {
  data: DataFetchType;
  type: string;
};

const SearchResultList = ({ data, type }: SearchResultListProps) => {
  const navigate = useNavigate();
  const handleItemClick = (id: string) => {
    if (type === "sets") {
      navigate(`/set/${id}`);
    } else if (type === "cards") {
      navigate(`/card/${id}`);
    } else return;
  };
  return (
    <li
      className={
        type === "series"
          ? "search-result-list__item"
          : "search-result-list__item search-result-list__item--clickable"
      }
      key={data.id}
      onClick={() => handleItemClick(data.id)}
    >
      <img
        src={type === "cards" ? `${data.image}/high.webp` : `${data.logo}.webp`}
        alt="image"
        className="search-result-list__image"
      />
      <div>{data.name}</div>
    </li>
  );
};

export default SearchResultList;
