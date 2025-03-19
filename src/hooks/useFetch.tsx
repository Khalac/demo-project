import axios from "axios";
import { useEffect, useState } from "react";
export const useFetch = ({
  SearchType,
  SearchStr,
}: {
  SearchType: string;
  SearchStr?: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [data, setData] = useState<any[]>([]);
  const field = SearchType === "cards" ? "image" : "logo";
  const filter =
    SearchType === "cards"
      ? "CardsFilters"
      : SearchType === "series"
      ? "SerieFilters"
      : "SetFilters";
  const search = `
    query Search ($filters: ${filter}) {
      ${SearchType} (filters: $filters) {
        name
        ${field}
        id
      }
    }
  `;
  const query = `
  query Query {
   ${SearchType} {
     ${field}
    id
    name
  }
}`;
  useEffect(() => {
    setLoading(true);
    axios
      .post(import.meta.env.VITE_API_KEY, {
        query: SearchStr ? search : query,
        variables: SearchStr ? { filters: { name: SearchStr } } : {},
      })
      .then((d) =>
        SearchType === "cards"
          ? setData(d.data.data.cards)
          : SearchType === "series"
          ? setData(d.data.data.series)
          : setData(d.data.data.sets)
      )
      .catch((err) => setErr(err.message))
      .finally(() => setLoading(false));
  }, [SearchStr, SearchType]);
  return { data, loading, err };
};
