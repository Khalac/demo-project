import { useFetch } from '@/hooks/useFetch'
import { useState } from 'react'
import Pagination from '../ui/Pagination/Pagination'
import SearchResult from '@/components/ui/SearchResult/SearchResult'
import useFilter from '@/hooks/useFilter'
import useDebounce from '@/hooks/useDebounce'
import { POKEMONTYPES } from '@/constants/PokemonTypes'
import { useSelector } from 'react-redux'
import './LikedCardsList.scss'
const LikedCardsList = () => {
  const { user } = useSelector((state: any) => state.user)
  const [input, setInput] = useState('')
  const [select, setSelect] = useState('no_filter')
  const [typePokemon, setTypePokemon] = useState<string[]>([])
  const keyword = useDebounce(input, 1000)
  const [page, setPage] = useState(1)
  const ITEMPERPAGE = 6
  const dataFilter = useFilter(select, user.likedCards, typePokemon, keyword)
  return (
    <div className="liked-cards-list">
      <div className="liked-cards-list__search">
        <div className="liked-cards-list__search-group">
          <label className="liked-cards-list__label">Name of Card: </label>
          <input
            type="text"
            className="liked-cards-list__input"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="liked-cards-list__search-group">
          <label className="liked-cards-list__label">Filter: </label>
          <select
            className="liked-cards-list__select"
            onChange={(e) => setSelect(e.target.value)}
          >
            <option value="no_filter">No filter</option>
            <option value="name_desc">From A to Z</option>
            <option value="name_asc">From Z to A</option>
          </select>
        </div>
        <div className="liked-cards-list__search-group">
          <label className="liked-cards-list__label">Type: </label>
          <div className="liked-cards-list__type-group">
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
      </div>
      <SearchResult
        data={user.likedCards}
        loading={false}
        err={''}
        type={'cards'}
        page={page}
        itemPerPage={ITEMPERPAGE}
        dataFilter={dataFilter}
      />
      <Pagination
        data={user.likedCards}
        itemPerPage={ITEMPERPAGE}
        page={page}
        setPage={setPage}
      />
    </div>
  )
}

export default LikedCardsList
