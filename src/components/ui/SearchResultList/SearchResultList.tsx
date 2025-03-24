import { DataFetchType } from '@/types/dataFetch'
import './SearchResultList.scss'

type SearchResultListProps = {
  data: DataFetchType[]
  page: number
  itemPerPage: number
  type: string
  handleItemClick: (a: string) => void
}
//Split SearchResult into a component
const SearchResultList = ({
  data,
  page,
  itemPerPage,
  type,
  handleItemClick,
}: SearchResultListProps) => {
  return (
    <div className="search-result-list">
      {data.slice((page - 1) * itemPerPage, page * itemPerPage).map((d) => {
        return (
          <li
            key={d.id}
            className={
              type === 'series'
                ? 'search-result-list__item'
                : 'search-result-list__item search-result-list__item--clickable'
            }
            onClick={() => handleItemClick(d.id)}
          >
            <img
              src={type === 'cards' ? `${d.image}/high.webp` : `${d.logo}.webp`}
              alt="image"
              className="search-result-list__image"
            />
            <div>{d.name}</div>
          </li>
        )
      })}
    </div>
  )
}

export default SearchResultList
