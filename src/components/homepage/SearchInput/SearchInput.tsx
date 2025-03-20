import { useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { useFetch } from "@/hooks/useFetch";
import Pagination from "@/components/ui/Pagination/Pagination";
import SearchResult from "@/components/ui/SearchResult/SearchResult";

import "./SearchInput.scss";

type SearchInput = {
  keyword: string;
  type: string;
};

const SearchInput = () => {
  const [type, setType] = useState("series");
  const [input, setInput] = useState("");

  const keyword = useDebounce(input, 1000, type);
  const [page, setPage] = useState(1);
  const { data, loading, err } = useFetch({
    type: type,
    keyword: keyword,
  });

  const ITEMPERPAGE = 6;

  return (
    <div className="searchinput">
      <form className="searchinput_form">
        <div>
          <label>Type: </label>
          <select
            className="searchinput_form_select"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="series">Series</option>
            <option value="sets">Sets</option>
            <option value="cards">Cards</option>
          </select>
        </div>
        <div>
          <label>Name: </label>
          <input type="text" onChange={(e) => setInput(e.target.value)} />
        </div>
      </form>
      <SearchResult
        data={data}
        loading={loading}
        err={err}
        type={type}
        keyword={keyword}
        input={input}
        page={page}
        itemPerPage={ITEMPERPAGE}
      />

      {!loading && keyword === input && (
        <Pagination
          data={data}
          ITEMPERPAGE={ITEMPERPAGE}
          page={page}
          setPage={setPage}
        />
      )}
    </div>
  );
};

export default SearchInput;
