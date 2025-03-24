import { DataFetchType } from "@/types/dataFetch";
import "./SearchResultItem.scss";

type SearchResultListProps = {
  data: DataFetchType;
  type: string;
  handleItemClick: (a: string) => void;
};

const SearchResultList = ({
  data,
  type,
  handleItemClick,
}: SearchResultListProps) => {
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
