import Header from "@/components/Header/Header";
import "./SetsPage.scss";
import DisplaySets from "@/components/Sets/DisplaySets";

const SetsPage = () => {
  return (
    <div className="setspage">
      <Header />
      <DisplaySets />
    </div>
  );
};

export default SetsPage;
