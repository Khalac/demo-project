import "./SearchResult.scss";

import { DataFetchType } from "@/types/dataFetch";
import SearchResultList from "./SearchResultItem/SearchResultItem";
type SearchResultProps = {
  data: DataFetchType[];
  loading: boolean;
  err: string;
  page: number;
  type: string;
  itemPerPage: number;
  dataFilter: DataFetchType[];
  isLikedCardPage?: boolean;
};
const SearchResult = ({
  data,
  loading,
  err,
  page,
  type,
  itemPerPage,
  dataFilter,
  isLikedCardPage,
}: SearchResultProps) => {
  const dataRender =
    dataFilter.length === 0 && !isLikedCardPage ? data : dataFilter;
  return (
    <div className="search-result">
   
      {!err && !loading && data.length === 0 && !isLikedCardPage && (
        <span className="search-result__empty">No data found</span>
      )}
      {!err && !loading && isLikedCardPage && dataRender.length === 0 && (
        <span className="search-result__empty">No data found</span>
      )}

      <ul className="search-result__list">
        {!loading &&
          dataRender
            .slice((page - 1) * itemPerPage, page * itemPerPage)
            .map((d) => {
              return <SearchResultList data={d} type={type} />;
            })}
      </ul>

    </div>
  );
};

export default SearchResult;
