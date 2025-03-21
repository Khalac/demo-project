import axios from "axios";
import { useEffect, useState } from "react";
export const useFetch = ({
  type,
  keyword,
  id,
}: {
  type: string;
  keyword?: string;
  id?: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [data, setData] = useState<any[]>([]);
  const field = type === "cards" ? "image" : "logo";
  const extraField =
    type === "set"
      ? `
    releaseDate
    cardCount {
      total
    }
    serie {
      name
      id
    }`
      : "";
  const filter =
    type === "cards"
      ? "CardsFilters"
      : type === "series"
      ? "SerieFilters"
      : "SetFilters";
  const search = `
    query Search ($filters: ${filter}) {
      ${type} (filters: $filters) {
        name
        ${field}
        id
      }
    }
  `;
  const query = `
  query Query {
   ${type} {
     ${field}
    id
    name
  }
}`;
  const queryDetail = `
query Query {
 ${type} {
   ${field}
  id
  name
  ${extraField}
}
}`;
  useEffect(() => {
    setLoading(true);
    axios
      .post(import.meta.env.VITE_API_KEY, {
        query: id ? queryDetail : keyword ? search : query,
        variables: id
          ? { filters: { id: id } }
          : keyword
          ? { filters: { name: keyword } }
          : {},
      })
      .then((d) =>
        type === "set"
          ? setData(d.data.data.set)
          : type === "card"
          ? setData(d.data.data.card)
          : type === "cards"
          ? setData(d.data.data.cards)
          : type === "series"
          ? setData(d.data.data.series)
          : setData(d.data.data.sets)
      )
      .catch((err) => setErr(err.message))
      .finally(() => setLoading(false));
  }, [keyword, type]);
  return { data, loading, err };
};
