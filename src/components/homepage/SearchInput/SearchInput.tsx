import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import SearchResult from "../../SearchResult/SearchResult";
import "./SearchInput.scss";

type SearchInput = {
  SearchStr: string;
  SearchType: string;
};

const SearchInput = () => {
  const { register, handleSubmit, reset } = useForm<SearchInput>();

  const [input, setInput] = useState<SearchInput>({
    SearchStr: "",
    SearchType: "",
  });
  const onSubmit: SubmitHandler<SearchInput> = (d) => {
    reset();
    setInput(d);
  };

  return (
    <div className="searchinput">
      <form onSubmit={handleSubmit(onSubmit)} className="search_form">
        <div>
          <label>Type: </label>
          <select {...register("SearchType")} className="type_select">
            <option value="series">Series</option>
            <option value="sets">Sets</option>
            <option value="cards">Cards</option>
          </select>
        </div>
        <div>
          <label>Name: </label>
          <input type="text" {...register("SearchStr")} />
        </div>
        <button type="submit">Search</button>
      </form>
      {input.SearchStr && <SearchResult {...input} />}
    </div>
  );
};

export default SearchInput;
