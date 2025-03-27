export const Queries = {
  SetsQuery: `query Query ( $filters : SetFilters ) { sets ( filters : $filters ) { id name logo } }`,
  SeriesQuery: `query Query ( $filters : SerieFilters ) { series ( filters : $filters)  { id name logo } }`,
  CardsQuery: `query Query ( $filters : CardsFilters ) { cards ( filters : $filters)  { id name image } }`,
};
