import { fetchDataSets } from "@/features/sets";
import { useState } from "react";
import { Filter, Pagination, SearchResult } from "../ui";
import useFilter from "@/hooks/useFilter";
import "./DisplaySets.scss";
import useDebounce from "@/hooks/useDebounce";
import ShowLoadingErr from "../ui/ShowLoadingError/ShowLoadingErr";

const DisplaySets = () => {
  const [input, setInput] = useState("");
  const [select, setSelect] = useState("no_filter");
  const keyword = useDebounce(input, 1000);
  const { data, loading, err } = fetchDataSets(keyword);

  const [page, setPage] = useState(1);
  const ITEMPERPAGE = 5;
  const dataFilter = data && useFilter(select, data);

  return (
    <div className="sets">
      <Filter setInput={setInput} setSelect={setSelect} page="Set" />
      {data && dataFilter && (
        <SearchResult
          data={data}
          loading={loading}
          err={err!}
          type={"sets"}
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

export default DisplaySets;
