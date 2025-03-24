import './SearchResult.scss'
import { useNavigate } from 'react-router-dom'
import { DataFetchType } from '@/types/dataFetch'
import SearchResultList from '../SearchResultList/SearchResultList'
type SearchResultProps = {
  data: DataFetchType[]
  loading: boolean
  err: string
  page: number
  type: string
  itemPerPage: number
  dataFilter: DataFetchType[]
  liked?: boolean
}
const SearchResult = ({
  data,
  loading,
  err,
  page,
  type,
  itemPerPage,
  dataFilter,
  liked,
}: SearchResultProps) => {
  const navigate = useNavigate()
  const handleItemClick = (id: string) => {
    if (type === 'sets') {
      navigate(`/set/${id}`)
    } else if (type === 'cards') {
      navigate(`/card/${id}`)
    } else return
  }
  const dataRender = dataFilter.length === 0 && !liked ? data : dataFilter

  return (
    <div className="search-result">
      {loading && <span className="search-result__loading">Loading...</span>}
      {!liked && !err && !loading && data.length === 0 && (
        <span className="search-result__empty">No data found</span>
      )}
      {liked && dataRender.length === 0 && (
        <span className="search-result__empty">No data found</span>
      )}
      <ul>
        {!loading && (
          <SearchResultList
            data={dataRender}
            type={type}
            page={page}
            itemPerPage={itemPerPage}
            handleItemClick={handleItemClick}
          />
        )}
      </ul>
      {err && <span className="search-result__error">{err}</span>}
    </div>
  )
}

export default SearchResult
