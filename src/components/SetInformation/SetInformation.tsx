import { useParams } from "react-router-dom";
import { useFetch } from "@/hooks/useFetch";
import "./SetInformation.scss";
const SetInformation = () => {
  const { id } = useParams();
  const { data, loading, err } = useFetch({ type: "set", id: id });
  return (
    <div className="setinformation">
      {loading && <span>Loading ... </span>}
      {data.map((d) => {
        return (
          <div key={d.id} className="setinformation_detail">
            <img
              src={`${d.logo}.webp`}
              className="setinformation_detail--image"
            />
            <div className="setinformation_detail--information">
              <div>Name: {d.name}</div>
              <div>Release date: {d.releaseDate}</div>
              <div>Belong to serie: {d.serie?.name}</div>
              <div>Total card: {d.cardCount?.total}</div>
            </div>
          </div>
        );
      })}
      {err && <span>{err}</span>}
    </div>
  );
};

export default SetInformation;
