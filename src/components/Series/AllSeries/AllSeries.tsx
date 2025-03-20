import { useFetch } from "@/hooks/useFetch";
import { useState } from "react";
import Pagination from "../../ui/Pagination/Pagination";
import SearchResult from "@/components/ui/SearchResult/SearchResult";
import useFilter from "@/hooks/useFilter";

import "./AllSeries.scss";
import useDebounce from "@/hooks/useDebounce";

const AllSeries = () => {
  const [input, setInput] = useState("");
  const [select, setSelect] = useState("no_filter");
  const keyword = useDebounce(input, 1000);
  const { data, loading, err } = useFetch(
    keyword ? { keyword: keyword, type: "series" } : { type: "series" }
  );
  const [page, setPage] = useState(1);

  const ITEMPERPAGE = 5;
  const dataFilter = useFilter(select, data);

  return (
    <div className="series">
      <div className="series_search">
        <div>
          <label>Name of Serie: </label>
          <input type="text" onChange={(e) => setInput(e.target.value)} />
        </div>
        <div>
          {" "}
          <label>Filter: </label>
          <select
            className="series_search_select"
            onChange={(e) => setSelect(e.target.value)}
          >
            <option value="no_filter">No filter</option>
            <option value="name_desc">From A to Z</option>
            <option value="name_asc">From Z to A</option>
          </select>
        </div>
      </div>
      <SearchResult
        data={data}
        loading={loading}
        err={err}
        type={"series"}
        keyword={keyword}
        input={input}
        page={page}
        itemPerPage={ITEMPERPAGE}
        dataFilter={dataFilter}
      />
      {!loading && (
        <Pagination
          data={data}
          ITEMPERPAGE={ITEMPERPAGE}
          page={page}
          setPage={setPage}
        />
      )}

      {err && <div>{err}</div>}
    </div>
  );
};

export default AllSeries;
