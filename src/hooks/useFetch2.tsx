import { DataFetchType } from "@/types/dataFetch";
import axios from "axios";
import { useEffect, useState } from "react";

export const useFetch2 = (
  query: string,
  variable: { name?: string; id?: string }
) => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string>();
  const [data, setData] = useState<{
    series?: DataFetchType[];
    cards?: DataFetchType[];
    sets?: DataFetchType[];
    card: DataFetchType;
  }>();

  const fetchData = async (controller: AbortController) => {
    setLoading(true);

    try {
      const data = await axios.post(
        import.meta.env.VITE_API_KEY,
        {
          query: query,
          variables: { filters: variable },
        },
        {
          signal: controller.signal,
        }
      );

      setData(data.data.data);
    } catch (err) {
      if ((err as Error).name === "CanceledError") {
        return 0;
      } else {
        setErr((err as Error).message);
      }
    }

    setLoading(false);
  };
  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller);
    return () => {
      controller.abort();
    };
  }, [query, JSON.stringify(variable)]);
  return { data, loading, err };
};
