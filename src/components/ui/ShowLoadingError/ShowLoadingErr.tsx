import "./ShowLoadingErr.scss";
const ShowLoadingErr = ({ loading, err }: { loading: boolean; err: any }) => {
  return (
    <>
      {" "}
      {loading && <span className="loading">Loading...</span>}
      {err && <span className="error">{err}</span>}
    </>
  );
};

export default ShowLoadingErr;
