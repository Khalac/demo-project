import axios from "axios";
import { useEffect, useState } from "react";
import { DataFetchType } from "@/types/dataFetch";
export const useFetch = ({
  type,
  keyword,
  id,
}: {
  type: string;
  keyword?: string;
  id?: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string>();
  const [data, setData] = useState<DataFetchType[]>([]);
  const field = type === "cards" ? "image" : "logo";
  const extraFieldQuery =
    type === "set"
      ? `
    releaseDate
    cardCount {
      total
    }
    serie {
      name
      id
    }`
      : "";
  const extraFieldSearch =
    type === "sets"
      ? `
    releaseDate
    `
      : "";
  const filter =
    type === "cards"
      ? "CardsFilters"
      : type === "series"
      ? "SerieFilters"
      : "SetFilters";
  const search = `
    query Search ($filters: ${filter}) {
      ${type} (filters: $filters) {
        name
        ${field}
        id
         ${extraFieldSearch}
      }
    }
  `;
  const queryDetail = `
  query Query ($filters: SetFilters) {
  ${type} (filters: $filters){
    ${field}
    id
    name
    ${extraFieldQuery}
  }
}`;

  const fetchData = async (controller: AbortController) => {
    setLoading(true);

    try {
      const data = await axios.post(
        import.meta.env.VITE_API_KEY,
        {
          query: id ? queryDetail : search,
          variables: id
            ? { filters: { id: id } }
            : { filters: { name: keyword } },
        },
        {
          signal: controller.signal,
        }
      );
      type === "set"
        ? setData([data.data.data.set])
        : type === "card"
        ? setData(data.data.data.card)
        : type === "cards"
        ? setData(data.data.data.cards)
        : type === "series"
        ? setData(data.data.data.series)
        : setData(data.data.data.sets);
    } catch (err) {
      if ((err as Error).name === "CanceledError") {
        return 0;
      } else {
        setErr((err as Error).message);
      }
    }

    setLoading(false);
  };
  //TODO: fix call api call twice
  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller);
    return () => {
      controller.abort();
    };
  }, [keyword, type, id]);
  return { data, loading, err };
};
