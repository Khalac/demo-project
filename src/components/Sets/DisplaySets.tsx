import { useFetch } from '@/hooks/useFetch'
import { useState } from 'react'
import Pagination from '../ui/Pagination/Pagination'
import SearchResult from '@/components/ui/SearchResult/SearchResult'
import useFilter from '@/hooks/useFilter'

import './DisplaySets.scss'
import useDebounce from '@/hooks/useDebounce'

const DisplaySets = () => {
  const [input, setInput] = useState('')
  const [select, setSelect] = useState('no_filter')
  const keyword = useDebounce(input, 1000)
  const { data, loading, err } = useFetch(
    keyword ? { keyword: keyword, type: 'sets' } : { type: 'sets' }
  )

  const [page, setPage] = useState(1)
  const ITEMPERPAGE = 5
  const dataFilter = useFilter(select, data)
  return (
    <div className="sets">
      <div className="sets__search">
        <div className="sets__search-group">
          <label className="sets__label">Name of Set: </label>
          <input
            type="text"
            className="sets__input"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="sets__search-group">
          <label className="sets__label">Filter: </label>
          <select
            className="sets__select"
            onChange={(e) => setSelect(e.target.value)}
          >
            <option value="no_filter">No filter</option>
            <option value="name_desc">From A to Z</option>
            <option value="name_asc">From Z to A</option>
            <option value="date_desc">From first release</option>
            <option value="date_asc">From last release</option>
          </select>
        </div>
      </div>
      <SearchResult
        data={data}
        loading={loading}
        err={err!}
        type={'sets'}
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

export default DisplaySets
