import React from "react";
import LogInForm from "@/components/LogInForm/LogInForm";
import "./LoginPage.scss";

const LoginPage = () => {
  return (
    <div className="loginpage">
      <div className="loginpage_title">LOG IN</div>
      <LogInForm />
    </div>
  );
};

export default LoginPage;
