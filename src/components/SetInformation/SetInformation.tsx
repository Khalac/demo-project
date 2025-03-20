import { useParams } from "react-router-dom";
import { useFetch } from "@/hooks/useFetch";
const SetInformation = () => {
  const { id } = useParams();
  const { data, loading, err } = useFetch({ type: "set", id: id });
  console.log(data, loading, err);
  return (
    <div className="setinformation">
      {loading && <span>Loading ... </span>}
      {err && <span>{err}</span>}
    </div>
  );
};

export default SetInformation;
