import { useFetch } from "@/hooks/useFetch";
import { Query } from "../model/query";

const fetchDetailCard = (id: string) => {
  const { data, err, loading } = useFetch(Query, { id: id });

  return {
    data: data && data.card,
    err,
    loading,
  };
};

export default fetchDetailCard;
