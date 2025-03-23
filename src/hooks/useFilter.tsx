import { DataFetchType } from '@/types/dataFetch'
const useFilter = (
  filterString: string,
  data: DataFetchType[],
  typePokemon?: string[]
) => {
  if (filterString === 'name_desc' && typePokemon !== undefined) {
    const temp = data
      .slice()
      .sort((a, b) => {
        const nameA = a.name.toUpperCase()
        const nameB = b.name.toUpperCase()
        if (nameA < nameB) {
          return -1
        }
        if (nameA > nameB) {
          return 1
        }

        return 0
      })
      .filter((item) => {
        if (typePokemon.length === 0) {
          return true
        }

        return Array.isArray(item.types) && typePokemon.includes(item.types[0])
      })

    return temp
  } else if (filterString === 'name_asc' && typePokemon !== undefined) {
    const temp = data
      .slice()
      .sort((a, b) => {
        const nameA = a.name.toUpperCase()
        const nameB = b.name.toUpperCase()
        if (nameA < nameB) {
          return -1
        }
        if (nameA > nameB) {
          return 1
        }

        return 0
      })
      .filter((item) => {
        if (typePokemon.length === 0) {
          return true
        }

        return Array.isArray(item.types) && typePokemon.includes(item.types[0])
      })
      .reverse()
    return temp
  } else if (filterString === 'date_desc') {
    const temp = data.slice().sort((a, b) => {
      return (
        new Date(a.releaseDate!).getTime() - new Date(b.releaseDate!).getTime()
      )
    })
    return temp
  } else if (filterString === 'date_asc') {
    const temp = data
      .slice()
      .sort((a, b) => {
        return (
          new Date(a.releaseDate!).getTime() -
          new Date(b.releaseDate!).getTime()
        )
      })
      .reverse()
    return temp
  } else if (filterString === 'no_filter' && typePokemon !== undefined) {
    const temp = data.slice().filter((item) => {
      if (typePokemon.length === 0) {
        return true
      }

      return Array.isArray(item.types) && typePokemon.includes(item.types[0])
    })

    return temp
  } else return []
}

export default useFilter
