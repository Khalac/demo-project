import "./SearchResult.scss";
import { useNavigate } from "react-router-dom";
import { DataFetchType } from "@/types/dataFetch";
import SearchResultList from "../SearchResultItem/SearchResultItem";
type SearchResultProps = {
  data: DataFetchType[];
  loading: boolean;
  err: string;
  page: number;
  type: string;
  itemPerPage: number;
  dataFilter: DataFetchType[];
};
const SearchResult = ({
  data,
  loading,
  err,
  page,
  type,
  itemPerPage,
  dataFilter,
}: SearchResultProps) => {
  const navigate = useNavigate();
  const handleItemClick = (id: string) => {
    if (type === "sets") {
      navigate(`/set/${id}`);
    } else if (type === "cards") {
      navigate(`/card/${id}`);
    } else return;
  };
  const dataRender = dataFilter.length === 0 ? data : dataFilter;
  return (
    <div className="search-result">
      {loading && <span className="search-result__loading">Loading...</span>}
      {!err && !loading && data.length === 0 && (
        <span className="search-result__empty">No data found</span>
      )}

      <ul className="search-result__list">
        {!loading &&
          dataRender
            .slice((page - 1) * itemPerPage, page * itemPerPage)
            .map((d) => {
              return (
                <SearchResultList
                  data={d}
                  type={type}
                  handleItemClick={handleItemClick}
                />
              );
            })}
      </ul>
      {err && <span className="search-result__error">{err}</span>}
    </div>
  );
};

export default SearchResult;
