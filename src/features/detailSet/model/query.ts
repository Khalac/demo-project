export const Query = `query Query ( $filters : SetFilters ) { sets ( filters : $filters)  { id name logo releaseDate cardCount { total } serie { name id } } }`;
