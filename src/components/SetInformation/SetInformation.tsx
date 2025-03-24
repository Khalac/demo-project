import { useParams } from 'react-router-dom'
import { useFetch } from '@/hooks/useFetch'
import './SetInformation.scss'

const SetInformation = () => {
  const { id } = useParams()
  const { data, loading, err } = useFetch({ type: 'set', id: id })
  return (
    <div className="set-info">
      {loading && <span>Loading ... </span>}
      {data.map((d) => {
        return (
          <div key={d.id} className="set-info__detail">
            <img src={`${d.logo}.webp`} className="set-info__image" />
            <div className="set-info__information">
              <div className="set-info__item">Name: {d.name}</div>
              <div className="set-info__item">
                Release date: {d.releaseDate}
              </div>
              <div className="set-info__item">
                Belong to serie: {d.serie?.name}
              </div>
              <div className="set-info__item">
                Total card: {d.cardCount?.total}
              </div>
            </div>
          </div>
        )
      })}
      {err && <span className="set-info__error">{err}</span>}
    </div>
  )
}

export default SetInformation
