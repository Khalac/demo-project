import AllSeries from "@/components/Series/AllSeries/AllSeries";
import Header from "@/components/Header/Header";
import "./SeriesPage.scss";

const SeriesPage = () => {
  return (
    <div className="seriespage">
      <Header />
      <AllSeries />
    </div>
  );
};

export default SeriesPage;
