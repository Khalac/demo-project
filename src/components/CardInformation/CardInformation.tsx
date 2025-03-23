import { useParams } from 'react-router-dom'
import { useFetch } from '@/hooks/useFetch'
import './CardInformation.scss'
const CardInformation = () => {
  const { id } = useParams()
  const { data, loading, err } = useFetch({ type: 'card', id: id })
  return (
    <div className="cardinformation">
      {loading && <div className="notification_loading">Loading ... </div>}
      {data.map((d) => {
        console.log(d)
        return (
          <div key={d.id} className="cardinformation_detail">
            <img
              src={`${d.image}/high.webp`}
              className="cardinformation_detail--image"
            />
            <div className="cardinformation_detail--information">
              <div>Category: {d.category}</div>
              <div>Name: {d.name}</div>
              <div>Belong to set: {d.set?.name}</div>
              <div>Rarity: {d.rarity}</div>
              {d.category === 'Energy' && (
                <div>
                  <div>Energy Type: {d.energyType}</div>
                </div>
              )}
              {d.category === 'Trainer' && (
                <div>
                  <div>Trainer Type: {d.trainerType}</div>
                  <div>Effect: {d.effect}</div>
                </div>
              )}
              {d.category === 'Pokemon' && (
                <div>
                  <div>HP: {d.hp}</div>
                  <div>
                    Type:
                    {d.types?.map((t, index) => {
                      return <span key={index}>{t}</span>
                    })}
                  </div>
                  <div>Attacks:</div>
                  {d.attacks?.map((a, index) => {
                    return (
                      <div key={index}>
                        <div>{a.name}</div>
                        <div>Damage: {a.damage}</div>
                        <div>Effect: {a.effect}</div>
                        <div>
                          Cost:{' '}
                          {a.cost.map((c, index) => {
                            return <span key={index}>{c}</span>
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        )
      })}
      {err && <div className="notification_error">{err}</div>}
    </div>
  )
}

export default CardInformation
