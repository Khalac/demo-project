import { useFetch2 } from "@/hooks/useFetch2";
import { Query } from "../model/query";

const fetchDetailCard = (id: string) => {
  const { data, err, loading } = useFetch2(Query, { id: id });

  return {
    data: data && data.card,
    err,
    loading,
  };
};

export default fetchDetailCard;
