import { useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { useFetch } from "@/hooks/useFetch";
import Pagination from "@/components/ui/Pagination/Pagination";

import "./SearchInput.scss";

type SearchInput = {
  SearchStr: string;
  SearchType: string;
};

const SearchInput = () => {
  const [style, setStyle] = useState("series");
  const [str, setStr] = useState("");

  const SearchStr = useDebounce(str, 1000, style);
  const [page, setPage] = useState(1);
  const { data, loading, err } = useFetch({
    SearchType: style,
    SearchStr: SearchStr,
  });

  const itemPerPage = 6;

  return (
    <div className="searchinput">
      <form className="search_form">
        <div>
          <label>Type: </label>
          <select
            className="type_select"
            onChange={(e) => setStyle(e.target.value)}
          >
            <option value="series">Series</option>
            <option value="sets">Sets</option>
            <option value="cards">Cards</option>
          </select>
        </div>
        <div>
          <label>Name: </label>
          <input type="text" onChange={(e) => setStr(e.target.value)} />
        </div>
      </form>
      <div className="search_result">
        {loading && <span>Loading...</span>}
        {!err && !loading && data.length === 0 && <span>No data found</span>}
        {SearchStr === str ? (
          <ul>
            {!loading &&
              data &&
              data
                .slice((page - 1) * itemPerPage, page * itemPerPage)
                .map((d) => {
                  return (
                    <li key={d.id} className="search_data">
                      <img
                        src={
                          style === "cards"
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

        {!loading && SearchStr === str && (
          <Pagination
            data={data}
            itemPerPage={itemPerPage}
            page={page}
            setPage={setPage}
          />
        )}

        {err && <span>{err}</span>}
      </div>
    </div>
  );
};

export default SearchInput;
