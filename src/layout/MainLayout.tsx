import React from "react";
import Header from "../components/Header/Header";
import "./MainLayout.scss";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="main-layout">
      <Header />
      {children}
    </div>
  );
};

export default MainLayout;
