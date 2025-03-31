import { useParams } from "react-router-dom";
import fetchDetailCard from "@/features/detailCard/fetchDetailCard/fetchDetailCard";
import "./CardInformation.scss";
import ButtonLikeCard from "@/features/likeCard/ui/ButtonLikeCard";
import ShowLoadingErr from "../ui/ShowLoadingError/ShowLoadingErr";

const CardInformation = () => {
  const { id } = useParams();
  const { data, loading, err } = fetchDetailCard(id!);
  console.log(loading, err);
  return (
    <div className="card-info">
      <ShowLoadingErr loading={loading} err={err} />
      {data && (
        <div key={data.id} className="card-info__container">
          <div className="card-info__image-wrapper">
            <img src={`${data.image}/high.webp`} className="card-info__image" />
          </div>
          <div className="card-info__content">
            <div className="card-info__detail">
              <span className="card-info__label">Category:</span>
              <span className="card-info__value">{data.category}</span>
            </div>
            <div className="card-info__detail">
              <span className="card-info__label">Name:</span>
              <span className="card-info__value">{data.name}</span>
            </div>
            <div className="card-info__detail">
              <span className="card-info__label">Set:</span>
              <span className="card-info__value">{data.set?.name}</span>
            </div>
            <div className="card-info__detail">
              <span className="card-info__label">Rarity:</span>
              <span className="card-info__value">{data.rarity}</span>
            </div>
            {data.category === "Energy" && (
              <div className="card-info__detail">
                <span className="card-info__label">Energy Type:</span>
                <span className="card-info__value">{data.energyType}</span>
              </div>
            )}
            {data.category === "Trainer" && (
              <div className="card-info__section">
                <div className="card-info__detail">
                  <span className="card-info__label">Trainer Type:</span>
                  <span className="card-info__value">{data.trainerType}</span>
                </div>
                <div className="card-info__detail">
                  <span className="card-info__label">Effect:</span>
                  <span className="card-info__value">{data.effect}</span>
                </div>
              </div>
            )}
            {data.category === "Pokemon" && (
              <div className="card-info__section">
                <div className="card-info__detail">
                  <span className="card-info__label">HP:</span>
                  <span className="card-info__value">{data.hp}</span>
                </div>
                <div className="card-info__detail">
                  <span className="card-info__label">Type:</span>
                  <div className="card-info__types">
                    {data.types?.map((t, index) => (
                      <span key={index} className="card-info__type">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="card-info__attacks">
                  <h3 className="card-info__subtitle">Attacks:</h3>
                  {data.attacks?.map((a, index) => (
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
            <ButtonLikeCard idCard={id!} data={data} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CardInformation;
