import "./SearchResult.scss";
import { createSearchParams, useNavigate } from "react-router-dom";
const SearchResult = ({
  data,
  loading,
  err,
  page,
  type,
  keyword,
  input,
  itemPerPage,
  dataFilter,
}: {
  data: any[];
  loading: boolean;
  err: null;
  page: number;
  type: string;
  keyword: string;
  input: string;
  itemPerPage: number;
  dataFilter: any[];
}) => {
  const navigate = useNavigate();
  const handleClick = (id: string) => {
    if (type === "sets") {
      navigate(`/set/${id}`);
    } else return;
  };
  return (
    <div className="search_result">
      {loading && <span>Loading...</span>}
      {!err && !loading && data.length === 0 && <span>No data found</span>}
      {keyword === input ? (
        <ul>
          {!loading &&
            dataFilter?.length !== 0 &&
            dataFilter!
              .slice((page - 1) * itemPerPage, page * itemPerPage)
              .map((d) => {
                return (
                  <li
                    key={d.id}
                    className={
                      type === "series"
                        ? "search_result_data"
                        : "search_result_data can_click"
                    }
                    onClick={() => handleClick(d.id)}
                  >
                    <img
                      src={
                        type === "cards"
                          ? `${d.image}/high.webp`
                          : `${d.logo}.webp`
                      }
                      alt="image"
                    />
                    <div>{d.name}</div>
                  </li>
                );
              })}
          {!loading &&
            data.length !== 0 &&
            dataFilter?.length === 0 &&
            data
              .slice((page - 1) * itemPerPage, page * itemPerPage)
              .map((d) => {
                return (
                  <li
                    key={d.id}
                    className={
                      type === "series"
                        ? "search_result_data"
                        : "search_result_data can_click"
                    }
                    onClick={() => handleClick(d.id)}
                  >
                    <img
                      src={
                        type === "cards"
                          ? `${d.image}/high.webp`
                          : `${d.logo}.webp`
                      }
                      alt="image"
                    />
                    <div>{d.name}</div>
                  </li>
                );
              })}
        </ul>
      ) : (
        <></>
      )}
      {err && <span>{err}</span>}
    </div>
  );
};

export default SearchResult;
