import { useFetch } from '@/hooks/useFetch'
import './SearchResult.scss'
import { useState } from 'react'
import Pagination from '../ui/Pagination/Pagination'
const SearchResult = ({
  SearchType,
  SearchStr,
}: {
  SearchType: string
  SearchStr: string
}) => {
  const [page, setPage] = useState(1)
  const { data, loading, err } = useFetch({
    SearchType,
    SearchStr,
  })
  const itemPerPage = 6
  return (
    <div>
      {loading && <div>Loading...</div>}
      <ul>
        {data &&
          data.slice((page - 1) * itemPerPage, page * itemPerPage).map((d) => {
            return (
              <li key={d.id} className="search_data">
                <img
                  src={
                    SearchType === 'cards'
                      ? `${d.image}/high.webp`
                      : `${d.logo}.webp`
                  }
                  alt="image"
                />
                <div>{d.name}</div>
              </li>
            )
          })}
      </ul>
      {!loading && (
        <Pagination
          data={data}
          itemPerPage={itemPerPage}
          page={page}
          setPage={setPage}
        />
      )}
      {err && <div>{err}</div>}
    </div>
  )
}

export default SearchResult
