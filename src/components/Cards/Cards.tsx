import { fetchCards } from "@/features/cards";
import { useState } from "react";
import useFilter from "@/hooks/useFilter";
import "./Cards.scss";
import useDebounce from "@/hooks/useDebounce";
import { Filter, Pagination, SearchResult } from "../ui";
import ShowLoadingErr from "../ui/ShowLoadingError/ShowLoadingErr";

const Cards = () => {
  const [input, setInput] = useState("");
  const [select, setSelect] = useState("no_filter");
  const [typePokemon, setTypePokemon] = useState<string[]>([]);
  const keyword = useDebounce(input, 2000);
  const { data, loading, err } = fetchCards(keyword);
  const [page, setPage] = useState(1);

  const ITEMPERPAGE = 5;
  const dataFilter = data && useFilter(select, data, typePokemon);

  return (
    <div className="cards">
      <Filter
        setInput={setInput}
        setSelect={setSelect}
        setTypePokemon={setTypePokemon}
        typePokemon={typePokemon}
        page="Card"
      />
      {data && dataFilter && (
        <SearchResult
          data={data}
          loading={loading}
          err={err!}
          type={"cards"}
          page={page}
          itemPerPage={ITEMPERPAGE}
          dataFilter={dataFilter}
          isLikedCardPage={true}
        />
      )}
      <ShowLoadingErr loading={loading} err={err} />
      {!loading && data && dataFilter && dataFilter.length !== 0 && (
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
