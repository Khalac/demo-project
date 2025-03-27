export const Query = `query Query ( $filters : CardsFilters ) { cards ( filters : $filters)  { id name image types } }`;
