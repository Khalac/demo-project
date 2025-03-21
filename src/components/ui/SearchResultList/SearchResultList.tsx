import { DataFetchType } from "@/types/dataFetch";
import "./SearchResultList.scss";

type SearchResultListProps = {
  data: DataFetchType[];
  page: number;
  itemPerPage: number;
  type: string;
  handleItemClick: (a: string) => void;
};

const SearchResultList = ({
  data,
  page,
  itemPerPage,
  type,
  handleItemClick,
}: SearchResultListProps) => {
  return (
    <div className="searchresultlist">
      {data.slice((page - 1) * itemPerPage, page * itemPerPage).map((d) => {
        return (
          <li
            key={d.id}
            className={
              type === "series"
                ? "search_result_data"
                : "search_result_data can_click"
            }
            onClick={() => handleItemClick(d.id)}
          >
            <img
              src={type === "cards" ? `${d.image}/high.webp` : `${d.logo}.webp`}
              alt="image"
            />
            <div>{d.name}</div>
          </li>
        );
      })}
    </div>
  );
};

export default SearchResultList;
