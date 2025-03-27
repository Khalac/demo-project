import { useFetch2 } from "@/hooks/useFetch2";
import { Query } from "../model/query";

const fetchDetailSetData = (id: string) => {
  const { data, err, loading } = useFetch2(Query, { id: id });

  return {
    data: data && data.sets,
    err,
    loading,
  };
};

export default fetchDetailSetData;
