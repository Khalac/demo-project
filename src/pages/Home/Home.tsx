import "./Home.scss";
import SearchInput from "@/components/Homepage/SearchInput";
import MainLayout from "@/layout/MainLayout";

const Home = () => {
  return (
    <MainLayout>
      <SearchInput />
    </MainLayout>
  );
};

export default Home;
