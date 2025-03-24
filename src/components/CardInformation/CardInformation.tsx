import { useParams } from "react-router-dom";
import { useFetch } from "@/hooks/useFetch";
import "./CardInformation.scss";
import { useDispatch, useSelector } from "react-redux";
import { addLikedCard, unlikedCard } from "@/redux/slice/likedCardSlice";

type LikedCardType = {
  id: string;
  name: string;
  image: string;
  types: string[];
};

const CardInformation = () => {
  const { id } = useParams();
  const { data, loading, err } = useFetch({ type: "card", id: id });
  const { user } = useSelector((state: any) => state.user);

  const dispatch = useDispatch();
  const handleLike = (card: LikedCardType) => {
    if (
      user.likedCards.some((a: any) => {
        return a.id === id;
      })
    ) {
      dispatch(unlikedCard(card));
    } else {
      dispatch(addLikedCard(card));
    }
  };
  return (
    <div className="card-info">
      {loading && <div className="card-info__loading">Loading ... </div>}
      {data.map((d) => {
        return (
          <div key={d.id} className="card-info__container">
            <div className="card-info__image-wrapper">
              <img src={`${d.image}/high.webp`} className="card-info__image" />
            </div>
            <div className="card-info__content">
              <div className="card-info__detail">
                <span className="card-info__label">Category:</span>
                <span className="card-info__value">{d.category}</span>
              </div>
              <div className="card-info__detail">
                <span className="card-info__label">Name:</span>
                <span className="card-info__value">{d.name}</span>
              </div>
              <div className="card-info__detail">
                <span className="card-info__label">Set:</span>
                <span className="card-info__value">{d.set?.name}</span>
              </div>
              <div className="card-info__detail">
                <span className="card-info__label">Rarity:</span>
                <span className="card-info__value">{d.rarity}</span>
              </div>
              {d.category === "Energy" && (
                <div className="card-info__detail">
                  <span className="card-info__label">Energy Type:</span>
                  <span className="card-info__value">{d.energyType}</span>
                </div>
              )}
              {d.category === "Trainer" && (
                <div className="card-info__section">
                  <div className="card-info__detail">
                    <span className="card-info__label">Trainer Type:</span>
                    <span className="card-info__value">{d.trainerType}</span>
                  </div>
                  <div className="card-info__detail">
                    <span className="card-info__label">Effect:</span>
                    <span className="card-info__value">{d.effect}</span>
                  </div>
                </div>
              )}
              {d.category === "Pokemon" && (
                <div className="card-info__section">
                  <div className="card-info__detail">
                    <span className="card-info__label">HP:</span>
                    <span className="card-info__value">{d.hp}</span>
                  </div>
                  <div className="card-info__detail">
                    <span className="card-info__label">Type:</span>
                    <div className="card-info__types">
                      {d.types?.map((t, index) => (
                        <span key={index} className="card-info__type">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="card-info__attacks">
                    <h3 className="card-info__subtitle">Attacks:</h3>
                    {d.attacks?.map((a, index) => (
                      <div key={index} className="card-info__attack">
                        <div className="card-info__detail">
                          <span className="card-info__label">Name:</span>
                          <span className="card-info__value">{a.name}</span>
                        </div>
                        <div className="card-info__detail">
                          <span className="card-info__label">Damage:</span>
                          <span className="card-info__value">{a.damage}</span>
                        </div>
                        <div className="card-info__detail">
                          <span className="card-info__label">Effect:</span>
                          <span className="card-info__value">{a.effect}</span>
                        </div>
                        <div className="card-info__detail">
                          <span className="card-info__label">Cost:</span>
                          <div className="card-info__costs">
                            {a.cost.map((c, index) => (
                              <span key={index} className="card-info__cost">
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <button
                className={`card-info__button ${
                  user.likedCards.some((a: any) => {
                    return a.id === id;
                  })
                    ? "card-info__button--liked"
                    : ""
                }`}
                onClick={() =>
                  handleLike({
                    id: d.id!,
                    name: d.name,
                    image: d.image!,
                    types: d.types!,
                  })
                }
              >
                {user.likedCards.some((a: any) => {
                  return a.id === id;
                })
                  ? "Liked"
                  : "Like"}
              </button>
            </div>
          </div>
        );
      })}
      {err && <div className="card-info__error">{err}</div>}
    </div>
  );
};

export default CardInformation;
