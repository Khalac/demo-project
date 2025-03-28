import { useFetch } from "@/hooks/useFetch";
import { Queries } from "../model/query";

const fetchData = (keyword: string, type: string) => {
  const { data, err, loading } = useFetch(
    type === "series"
      ? Queries.SeriesQuery
      : type === "sets"
      ? Queries.SetsQuery
      : Queries.CardsQuery,
    { name: keyword }
  );
  return {
    data: data
      ? type === "series"
        ? data.series
        : type === "sets"
        ? data.sets
        : data.cards
      : [],
    err,
    loading,
  };
};

export default fetchData;
