export type DataFetchType = {
  //make a type for data when fetching from api
  id: string;
  name: string;
  logo?: string;
  image?: string;
  releaseDate?: string;
  serie?: {
    name: string;
    id: string;
  };
  cardCount?: {
    total: number;
  };
};
