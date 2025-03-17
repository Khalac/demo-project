import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useFetch } from "@/hooks/useFetch";

type SearchInput = {
  SearchStr: string;
  SearchType: string;
};

const SearchInput = () => {
  const { register, handleSubmit } = useForm<SearchInput>();

  const [input, setInput] = useState<SearchInput>({
    SearchStr: "",
    SearchType: "cards",
  });

  const { loading, error, data } = useFetch({ ...input });

  const onSubmit: SubmitHandler<SearchInput> = (d) => {
    setInput(d);
  };

  return (
    <div className="searchinput">
      <form onSubmit={handleSubmit(onSubmit)}>
        <select {...register("SearchType")}>
          <option value="series">Series</option>
          <option value="sets">Sets</option>
          <option value="cards">Cards</option>
        </select>
        <input type="text" {...register("SearchStr")} />
        <button type="submit">Search</button>
      </form>

      {input.SearchStr ? (
        <>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SearchInput;
