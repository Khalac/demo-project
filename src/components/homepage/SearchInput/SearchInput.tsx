import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import SearchResult from "../../SearchResult/SearchResult";
import "./SearchInput.scss";

type SearchInput = {
  SearchStr: string;
  SearchType: string;
};

const SearchInput = () => {
  const { register, handleSubmit } = useForm<SearchInput>();

  const [input, setInput] = useState<SearchInput>({
    SearchStr: "",
    SearchType: "",
  });
  const onSubmit: SubmitHandler<SearchInput> = (d) => {
    setInput(d);
  };

  return (
    <div className="searchinput">
      <form onSubmit={handleSubmit(onSubmit)} className="search_form">
        <select {...register("SearchType")} className="type_select">
          <option value="series">Series</option>
          <option value="sets">Sets</option>
          <option value="cards">Cards</option>
        </select>
        <input type="text" {...register("SearchStr")} />
        <button type="submit">Search</button>
      </form>
      {input.SearchStr && <SearchResult {...input} />}
    </div>
  );
};

export default SearchInput;
