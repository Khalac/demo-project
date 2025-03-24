import { useFetch } from "@/hooks/useFetch";
import { useState } from "react";
import Pagination from "../ui/Pagination/Pagination";
import SearchResult from "@/components/ui/SearchResult/SearchResult";
import useFilter from "@/hooks/useFilter";
import "./Cards.scss";
import useDebounce from "@/hooks/useDebounce";

import Filter from "../ui/Filter/Filter";

const Cards = () => {
  const [input, setInput] = useState("");
  const [select, setSelect] = useState("no_filter");
  const [typePokemon, setTypePokemon] = useState<string[]>([]);
  const keyword = useDebounce(input, 1000);
  const { data, loading, err } = useFetch(
    keyword ? { keyword: keyword, type: "cards" } : { type: "cards" }
  );
  const [page, setPage] = useState(1);

  const ITEMPERPAGE = 5;
  const dataFilter = useFilter(select, data, typePokemon);

  return (
    <div className="cards">
      <Filter
        setInput={setInput}
        setSelect={setSelect}
        setTypePokemon={setTypePokemon}
        typePokemon={typePokemon}
        page="Card"
      />
      <SearchResult
        data={data}
        loading={loading}
        err={err!}
        type={"cards"}
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

export default Cards;
