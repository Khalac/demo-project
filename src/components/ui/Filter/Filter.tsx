import "./Filter.scss";
import { POKEMONTYPES } from "@/constants/PokemonTypes";
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
        <div className="filter-group">
          <label className="filter__label">Type: </label>
          <select
            className="filter__select"
            onChange={(e) => setType && setType(e.target.value)}
          >
            <option value="series">Series</option>
            <option value="sets">Sets</option>
            <option value="cards">Cards</option>
          </select>
        </div>
      )}
      <div className="filter-group">
        <label className="filter__label">Name: </label>
        <input
          type="text"
          className="filter__input"
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <div className="filter-group">
        <label className="filter__label">Filter: </label>
        <select
          className="filter__select"
          onChange={(e) => setSelect(e.target.value)}
        >
          <option value="no_filter">No filter</option>
          <option value="name_desc">From A to Z</option>
          <option value="name_asc">From Z to A</option>
          {page === "Set" && (
            <>
              <option value="date_desc">From first release</option>
              <option value="date_asc">From last release</option>
            </>
          )}
        </select>
      </div>
      {page === "Card" && (
        <div className="filter-group">
          <label className="filter__label">Type: </label>
          <div className="filter__type-group">
            {POKEMONTYPES.map((type) => (
              <div key={type.id}>
                <input
                  type="checkbox"
                  value={type.id}
                  onChange={(e) => {
                    if (typePokemon?.includes(e.target.value)) {
                      setTypePokemon!(
                        typePokemon.filter((type) => type !== e.target.value)
                      );
                    } else {
                      setTypePokemon!([...typePokemon!, e.target.value]);
                    }
                  }}
                />
                <label>{type.name}</label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
