import { useFetch } from "@/hooks/useFetch";
import { useState } from "react";
import Pagination from "../../ui/Pagination/Pagination";
import SearchResult from "@/components/ui/SearchResult/SearchResult";

import "./AllSeries.scss";
import useDebounce from "@/hooks/useDebounce";

const AllSeries = () => {
  const [input, setInput] = useState("");

  const keyword = useDebounce(input, 1000);
  const { data, loading, err } = useFetch(
    keyword ? { keyword: keyword, type: "series" } : { type: "series" }
  );
  const [page, setPage] = useState(1);

  const ITEMPERPAGE = 4;

  return (
    <div className="series">
      <div className="series_search">
        <label>Input name of Serie</label>
        <input type="text" onChange={(e) => setInput(e.target.value)} />
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
