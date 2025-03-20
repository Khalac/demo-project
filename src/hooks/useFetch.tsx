import axios from "axios";
import { useEffect, useState } from "react";
export const useFetch = ({
  type,
  keyword,
}: {
  type: string;
  keyword?: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [data, setData] = useState<any[]>([]);
  const field = type === "cards" ? "image" : "logo";
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
  useEffect(() => {
    setLoading(true);
    axios
      .post(import.meta.env.VITE_API_KEY, {
        query: keyword ? search : query,
        variables: keyword ? { filters: { name: keyword } } : {},
      })
      .then((d) =>
        type === "cards"
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
