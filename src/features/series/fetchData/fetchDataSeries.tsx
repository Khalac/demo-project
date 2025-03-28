import { useFetch } from "@/hooks/useFetch";
import { Query } from "../model/query";

const fetchDataSeries = (keyword: string) => {
  const { data, err, loading } = useFetch(Query, { name: keyword });
  return {
    data: data && data.series,
    err,
    loading,
  };
};

export default fetchDataSeries;
