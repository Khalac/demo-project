import { useFetch } from "@/hooks/useFetch";
import { Query } from "../model/query";

const fetchCards = (keyword: string) => {
  const { data, err, loading } = useFetch(Query, { name: keyword });

  return {
    data: data && data.cards,
    err,
    loading,
  };
};

export default fetchCards;
