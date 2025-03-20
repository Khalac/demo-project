import "./SearchResult.scss";
const SearchResult = ({
  data,
  loading,
  err,
  page,
  type,
  keyword,
  input,
  itemPerPage,
}: {
  data: any[];
  loading: boolean;
  err: null;
  page: number;
  type: string;
  keyword: string;
  input: string;
  itemPerPage: number;
}) => {
  return (
    <div className="search_result">
      {loading && <span>Loading...</span>}
      {!err && !loading && data.length === 0 && <span>No data found</span>}
      {keyword === input ? (
        <ul>
          {!loading &&
            data &&
            data
              .slice((page - 1) * itemPerPage, page * itemPerPage)
              .map((d) => {
                return (
                  <li key={d.id} className="search_result_data">
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
