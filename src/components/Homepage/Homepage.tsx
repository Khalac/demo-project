import { useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import ShowLoadingErr from "../ui/ShowLoadingError/ShowLoadingErr";
import useFilter from "@/hooks/useFilter";
import { Filter, Pagination, SearchResult } from "../ui";
import { fetchData } from "@/features/home";

import "./Homepage.scss";

const Homepage = () => {
  const [type, setType] = useState("series");
  const [input, setInput] = useState<string>("");
  const keyword = useDebounce(input, 1000, type);
  const [page, setPage] = useState(1);
  const [select, setSelect] = useState("no_filter");
  const { data, loading, err } = fetchData(keyword, type);
  const ITEMPERPAGE = 6;
  const dataFilter = data && useFilter(select, data);

  return (
    <div className="search-form">
      <Filter
        setInput={setInput}
        setType={setType}
        setSelect={setSelect}
        page="Home"
      />
      {data && dataFilter && (
        <SearchResult
          data={data}
          loading={loading}
          err={err!}
          type={type}
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

export default Homepage;
