import { useFetch } from "@/hooks/useFetch";
import { Query } from "../model/query";

const fetchDetailSetData = (id: string) => {
  const { data, err, loading } = useFetch(Query, { id: id });

  return {
    data: data && data.sets,
    err,
    loading,
  };
};

export default fetchDetailSetData;
