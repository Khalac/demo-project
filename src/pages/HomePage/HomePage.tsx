import Header from "@/components/Header/Header";
import "./HomePage.scss";
import SearchInput from "@/components/Homepage/SearchInput/SearchInput";

const HomePage = () => {
  return (
    <div className="homepage">
      <Header />
      <SearchInput />
    </div>
  );
};

export default HomePage;
