export const Query = `query Query ( $filters : SerieFilters ) { series ( filters : $filters)  { id name logo } }`;
