export type DataFetchType = {
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
