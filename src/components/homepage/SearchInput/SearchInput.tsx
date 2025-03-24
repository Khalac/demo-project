import { useState } from 'react'
import useDebounce from '@/hooks/useDebounce'
import { useFetch } from '@/hooks/useFetch'
import Pagination from '@/components/ui/Pagination/Pagination'
import SearchResult from '@/components/ui/SearchResult/SearchResult'
import useFilter from '@/hooks/useFilter'

import './SearchInput.scss'

const SearchInput = () => {
  const [type, setType] = useState('series')
  const [input, setInput] = useState('')

  const keyword = useDebounce(input, 1000, type)
  const [page, setPage] = useState(1)
  const { data, loading, err } = useFetch({
    type: type,
    keyword: keyword,
  })
  const [select, setSelect] = useState('no_filter')

  const ITEMPERPAGE = 6
  const dataFilter = useFilter(select, data)

  return (
    <div className="search-form">
      <div className="search-form__container">
        <div>
          <label>Type: </label>
          <select
            className="search-form__select"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="series">Series</option>
            <option value="sets">Sets</option>
            <option value="cards">Cards</option>
          </select>
        </div>
        <div>
          <label>Name: </label>
          <input type="text" onChange={(e) => setInput(e.target.value)} />
        </div>
        <div>
          <label>Filter: </label>
          <select
            className="search-form__select"
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
        type={type}
        page={page}
        itemPerPage={ITEMPERPAGE}
        dataFilter={dataFilter}
      />

      {!loading && keyword === input && (
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

export default SearchInput
