import { useFetch2 } from "@/hooks/useFetch2";
import { Query } from "../model/query";

const fetchDataSets = (keyword: string) => {
  const { data, err, loading } = useFetch2(Query, { name: keyword });
  return {
    data: data && data.sets,
    err,
    loading,
  };
};

export default fetchDataSets;
