import { useQuery, gql } from "@apollo/client";
export const useFetch = ({
  SearchType,
  SearchStr,
}: {
  SearchType: string;
  SearchStr: string;
}) => {
  const field = SearchType === "cards" ? "image" : "logo";
  const search = gql`
    query Query ($filters: CardsFilters) {
      ${SearchType} (filters: $filters) {
        name
        ${field}
        id
      }
    }
  `;
  const { loading, error, data } = useQuery(search, {
    variables: { filters: { name: SearchStr } },
  });

  return { loading, error, data };
};
