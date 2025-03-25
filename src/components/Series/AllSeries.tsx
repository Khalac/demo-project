import { useFetch } from "@/hooks/useFetch";
import { useState } from "react";
import Pagination from "../ui/Pagination/Pagination";
import SearchResult from "@/components/ui/SearchResult/SearchResult";
import useFilter from "@/hooks/useFilter";
import useDebounce from "@/hooks/useDebounce";
import "./AllSeries.scss";
import Filter from "@/components/ui/Filter/Filter";

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
      <Filter setInput={setInput} setSelect={setSelect} page="Serie" />
      <SearchResult
        data={data}
        loading={loading}
        err={err!}
        type={"series"}
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

export default AllSeries;
