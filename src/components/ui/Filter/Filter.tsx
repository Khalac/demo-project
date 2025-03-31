import "./Filter.scss";
import { OptionFilter, TypePokemonFilter, NameFilter } from "./_components";
type FilterProps = {
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setSelect: React.Dispatch<React.SetStateAction<string>>;
  setType?: React.Dispatch<React.SetStateAction<string>>;
  typePokemon?: string[];
  setTypePokemon?: React.Dispatch<React.SetStateAction<string[]>>;
  page: string;
};
const Filter = ({
  setInput,
  setSelect,
  setType,
  typePokemon,
  setTypePokemon,
  page,
}: FilterProps) => {
  return (
    <div className="filter">
      {page === "Home" && (
        <OptionFilter setValue={setType} label="Type">
          <option value="series">Series</option>
          <option value="sets">Sets</option>
          <option value="cards">Cards</option>
        </OptionFilter>
      )}
      <NameFilter setInput={setInput} />
      <OptionFilter setValue={setSelect} label="Type">
        <option value="no_filter">No filter</option>
        <option value="name_desc">From A to Z</option>
        <option value="name_asc">From Z to A</option>
        {page === "Set" && (
          <>
            <option value="date_desc">From first release</option>
            <option value="date_asc">From last release</option>
          </>
        )}
      </OptionFilter>

      {page === "Card" && (
        <TypePokemonFilter
          setTypePokemon={setTypePokemon}
          typePokemon={typePokemon}
        />
      )}
    </div>
  );
};

export default Filter;
