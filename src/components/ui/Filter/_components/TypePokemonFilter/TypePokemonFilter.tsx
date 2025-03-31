import React from "react";
import { POKEMONTYPES } from "@/components/Header/constants/PokemonTypes";
import "./TypePokemonFilter.scss";

type TypePokemonFilterProps = {
  typePokemon?: string[];
  setTypePokemon?: React.Dispatch<React.SetStateAction<string[]>>;
};

const TypePokemonFilter = ({
  typePokemon,
  setTypePokemon,
}: TypePokemonFilterProps) => {
  return (
    <div className="filter-group">
      <label className="filter-group__label">Type: </label>
      <div className="filter-group__type-group">
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
  );
};

export default TypePokemonFilter;
