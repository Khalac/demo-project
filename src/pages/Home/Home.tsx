import "./Home.scss";
import SearchInput from "@/components/Homepage/Homepage";
import MainLayout from "@/layout/MainLayout";

const Home = () => {
  return (
    <MainLayout>
      <SearchInput />
    </MainLayout>
  );
};

export default Home;
