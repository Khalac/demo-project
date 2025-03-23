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
}
const SearchResult = ({
  data,
  loading,
  err,
  page,
  type,
  itemPerPage,
  dataFilter,
}: SearchResultProps) => {
  const navigate = useNavigate()
  const handleItemClick = (id: string) => {
    if (type === 'sets') {
      navigate(`/set/${id}`)
    } else if (type === 'cards') {
      navigate(`/card/${id}`)
    } else return
  }
  const dataRender = dataFilter.length === 0 ? data : dataFilter

  return (
    <div className="search_result">
      {loading && <span>Loading...</span>}
      {!err && !loading && data.length === 0 && <span>No data found</span>}

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
      {err && <span>{err}</span>}
    </div>
  )
}

export default SearchResult
