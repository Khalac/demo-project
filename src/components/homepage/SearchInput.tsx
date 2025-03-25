import { useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { useFetch } from "@/hooks/useFetch";
import Pagination from "@/components/ui/Pagination/Pagination";
import SearchResult from "@/components/ui/SearchResult/SearchResult";
import useFilter from "@/hooks/useFilter";
import Filter from "@/components/ui/Filter/Filter";

import "./SearchInput.scss";

const SearchInput = () => {
  const [type, setType] = useState("series");
  const [input, setInput] = useState("");

  const keyword = useDebounce(input, 1000, type);
  const [page, setPage] = useState(1);
  const { data, loading, err } = useFetch({
    type: type,
    keyword: keyword,
  });
  const [select, setSelect] = useState("no_filter");

  const ITEMPERPAGE = 6;
  const dataFilter = useFilter(select, data);

  return (
    <div className="search-form">
      <Filter
        setInput={setInput}
        setType={setType}
        setSelect={setSelect}
        page="Home"
      />
      <SearchResult
        data={data}
        loading={loading}
        err={err!}
        type={type}
        page={page}
        itemPerPage={ITEMPERPAGE}
        dataFilter={dataFilter}
      />

      {!loading && keyword === input && (
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

export default SearchInput;
