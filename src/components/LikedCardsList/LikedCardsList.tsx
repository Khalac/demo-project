import { useState } from "react";
import Pagination from "../ui/Pagination/Pagination";
import SearchResult from "@/components/ui/SearchResult/SearchResult";
import useFilter from "@/hooks/useFilter";
import useDebounce from "@/hooks/useDebounce";
import Filter from "../ui/Filter/Filter";
import { useSelector } from "react-redux";
import "./LikedCardsList.scss";
const LikedCardsList = () => {
  const { user } = useSelector((state: any) => state.user);
  const [input, setInput] = useState("");
  const [select, setSelect] = useState("no_filter");
  const [typePokemon, setTypePokemon] = useState<string[]>([]);
  const keyword = useDebounce(input, 1000);
  const [page, setPage] = useState(1);
  const ITEMPERPAGE = 6;
  const dataFilter = useFilter(select, user.likedCards, typePokemon, keyword);
  return (
    <div className="liked-cards-list">
      <Filter
        setInput={setInput}
        setSelect={setSelect}
        setTypePokemon={setTypePokemon}
        typePokemon={typePokemon}
        page="Card"
      />
      <SearchResult
        data={user.likedCards}
        loading={false}
        err={""}
        type={"cards"}
        page={page}
        itemPerPage={ITEMPERPAGE}
        dataFilter={dataFilter}
      />
      <Pagination
        data={user.likedCards}
        itemPerPage={ITEMPERPAGE}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default LikedCardsList;
