import { useFetch } from '@/hooks/useFetch'
import { useState } from 'react'
import Pagination from '../ui/Pagination/Pagination'
import SearchResult from '@/components/ui/SearchResult/SearchResult'
import useFilter from '@/hooks/useFilter'
import useDebounce from '@/hooks/useDebounce'
import { POKEMONTYPES } from '@/constants/PokemonTypes'
import './Cards.scss'
const Cards = () => {
  const [input, setInput] = useState('')
  const [select, setSelect] = useState('no_filter')
  const [typePokemon, setTypePokemon] = useState<string[]>([])
  const keyword = useDebounce(input, 1000)
  const { data, loading, err } = useFetch(
    keyword ? { keyword: keyword, type: 'cards' } : { type: 'cards' }
  )
  const [page, setPage] = useState(1)

  const ITEMPERPAGE = 6
  const dataFilter = useFilter(select, data, typePokemon)

  return (
    <div>
      <div className="cards">
        <div className="cards_search">
          <div>
            <label>Name of Card: </label>
            <input type="text" onChange={(e) => setInput(e.target.value)} />
          </div>
          <div>
            {' '}
            <label>Filter: </label>
            <select
              className="cards_search_select"
              onChange={(e) => setSelect(e.target.value)}
            >
              <option value="no_filter">No filter</option>
              <option value="name_desc">From A to Z</option>
              <option value="name_asc">From Z to A</option>
            </select>
          </div>
          <div className="cards_search_type">
            {POKEMONTYPES.map((type) => (
              <div key={type.id}>
                <input
                  type="checkbox"
                  value={type.id}
                  onChange={(e) => {
                    if (typePokemon.includes(e.target.value)) {
                      setTypePokemon(
                        typePokemon.filter((type) => type !== e.target.value)
                      )
                    } else {
                      setTypePokemon([...typePokemon, e.target.value])
                    }
                  }}
                />
                <label>{type.name}</label>
              </div>
            ))}
          </div>
        </div>
        <SearchResult
          data={data}
          loading={loading}
          err={err!}
          type={'cards'}
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
    </div>
  )
}

export default Cards
