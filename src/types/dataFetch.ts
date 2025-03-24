type Attacks = {
  cost: string[]
  damage: string
  effect: string
  name: string
}

export type DataFetchType = {
  //make a type for data when fetching from api
  id: string
  name: string
  logo?: string
  image?: string
  releaseDate?: string
  types?: string[]
  set?: {
    name: string
  }
  serie?: {
    name: string
  }
  cardCount?: {
    total: number
  }
  attacks?: Attacks[]
  category: string
  hp: number
  rarity: string
  effect: string
  trainerType: string
  energyType: string
}
