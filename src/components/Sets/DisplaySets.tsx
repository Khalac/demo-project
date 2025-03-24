import { useFetch } from "@/hooks/useFetch";
import { useState } from "react";
import Pagination from "../ui/Pagination/Pagination";
import SearchResult from "@/components/ui/SearchResult/SearchResult";
import useFilter from "@/hooks/useFilter";

import "./DisplaySets.scss";
import useDebounce from "@/hooks/useDebounce";
import Filter from "../ui/Filter/Filter";

const DisplaySets = () => {
  const [input, setInput] = useState("");
  const [select, setSelect] = useState("no_filter");
  const keyword = useDebounce(input, 1000);
  const { data, loading, err } = useFetch(
    keyword ? { keyword: keyword, type: "sets" } : { type: "sets" }
  );

  const [page, setPage] = useState(1);
  const ITEMPERPAGE = 5;
  const dataFilter = useFilter(select, data);

  return (
    <div className="sets">
      <Filter setInput={setInput} setSelect={setSelect} page="Set" />
      <SearchResult
        data={data}
        loading={loading}
        err={err!}
        type={"sets"}
        page={page}
        itemPerPage={ITEMPERPAGE}
        dataFilter={dataFilter}
      />
      {!loading && (
        <Pagination
          data={data}
          itemPerPage={ITEMPERPAGE}
          page={page}
          setPage={setPage}
        />
      )}
    </div>
  );
};

export default DisplaySets;
