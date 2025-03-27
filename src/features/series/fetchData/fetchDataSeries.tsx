import { useFetch2 } from "@/hooks/useFetch2";
import { Query } from "../model/query";

const fetchDataSeries = (keyword: string) => {
  const { data, err, loading } = useFetch2(Query, { name: keyword });
  return {
    data: data && data.series,
    err,
    loading,
  };
};

export default fetchDataSeries;
