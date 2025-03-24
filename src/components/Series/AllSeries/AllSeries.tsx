import { useFetch } from '@/hooks/useFetch'
import { useState } from 'react'
import Pagination from '../../ui/Pagination/Pagination'
import SearchResult from '@/components/ui/SearchResult/SearchResult'
import useFilter from '@/hooks/useFilter'
import useDebounce from '@/hooks/useDebounce'
import './AllSeries.scss'

const AllSeries = () => {
  const [input, setInput] = useState('')
  const [select, setSelect] = useState('no_filter')
  const keyword = useDebounce(input, 1000)
  const { data, loading, err } = useFetch(
    keyword ? { keyword: keyword, type: 'series' } : { type: 'series' }
  )
  const [page, setPage] = useState(1)

  const ITEMPERPAGE = 5
  const dataFilter = useFilter(select, data)

  return (
    <div className="series">
      <div className="series__search">
        <div className="series__search-group">
          <label className="series__label">Name of Serie: </label>
          <input
            type="text"
            className="series__input"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="series__search-group">
          <label className="series__label">Filter: </label>
          <select
            className="series__select"
            onChange={(e) => setSelect(e.target.value)}
          >
            <option value="no_filter">No filter</option>
            <option value="name_desc">From A to Z</option>
            <option value="name_asc">From Z to A</option>
          </select>
        </div>
      </div>
      <SearchResult
        data={data}
        loading={loading}
        err={err!}
        type={'series'}
        page={page}
        itemPerPage={ITEMPERPAGE}
        dataFilter={dataFilter}
      />
      {!loading && (
        <Pagination
          data={data}
          itemPerPage={ITEMPERPAGE}
          page={page}
          setPage={setPage}
        />
      )}
    </div>
  )
}

export default AllSeries
