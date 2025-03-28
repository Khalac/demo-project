import { useFetch } from "@/hooks/useFetch";
import { Query } from "../model/query";

const fetchDataSets = (keyword: string) => {
  const { data, err, loading } = useFetch(Query, { name: keyword });
  return {
    data: data && data.sets,
    err,
    loading,
  };
};

export default fetchDataSets;
