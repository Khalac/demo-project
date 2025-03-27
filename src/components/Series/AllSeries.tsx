import { useState } from "react";
import { Filter, Pagination, SearchResult } from "../ui";
import useFilter from "@/hooks/useFilter";
import useDebounce from "@/hooks/useDebounce";
import ShowLoadingErr from "../ui/ShowLoadingError/ShowLoadingErr";
import { fetchDataSeries } from "@/features/series";
import "./AllSeries.scss";

const AllSeries = () => {
  const [input, setInput] = useState("");
  const [select, setSelect] = useState("no_filter");
  const keyword = useDebounce(input, 1000);
  const { data, loading, err } = fetchDataSeries(keyword);
  const [page, setPage] = useState(1);

  const ITEMPERPAGE = 5;
  const dataFilter = data && useFilter(select, data);

  return (
    <div className="series">
      <Filter setInput={setInput} setSelect={setSelect} page="Serie" />
      {data && dataFilter && (
        <SearchResult
          data={data}
          loading={loading}
          err={err!}
          type={"series"}
          page={page}
          itemPerPage={ITEMPERPAGE}
          dataFilter={dataFilter}
        />
      )}
      <ShowLoadingErr loading={loading} err={err} />
      {!loading && data && (
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
