import { useFetch } from "@/hooks/useFetch";
import { useState } from "react";
import Pagination from "../../ui/Pagination/Pagination";

import "./AllSeries.scss";
import useDebounce from "@/hooks/useDebounce";

const AllSeries = () => {
  const [input, setInput] = useState("");

  const SearchStr = useDebounce(input, 1000);
  const { data, loading, err } = useFetch(
    SearchStr
      ? { SearchStr: SearchStr, SearchType: "series" }
      : { SearchType: "series" }
  );
  const [page, setPage] = useState(1);

  const itemPerPage = 4;

  return (
    <div className="all_series">
      <label>Input name of Serie</label>
      <input type="text" onChange={(e) => setInput(e.target.value)} />
      {loading && <div>Loading...</div>}
      {!err && !loading && data.length == 0 && <div>No data found</div>}
      <ul>
        {!loading &&
          data &&
          data.slice((page - 1) * itemPerPage, page * itemPerPage).map((d) => {
            return (
              <li key={d.id} className="search_data">
                <img src={`${d.logo}.webp`} alt="image" />
                <div>{d.name}</div>
              </li>
            );
          })}
      </ul>

      {!loading && (
        <Pagination
          data={data}
          itemPerPage={itemPerPage}
          page={page}
          setPage={setPage}
        />
      )}

      {err && <div>{err}</div>}
    </div>
  );
};

export default AllSeries;
