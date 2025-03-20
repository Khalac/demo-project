import SignUpForm from "@/components/authentication/SignUpForm/SignUpForm";
import "./SignupPage.scss";

const SignupPage = () => {
  return (
    <div>
      <div className="signuppage">
        <div className="signuppage_title">SIGN UP</div>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignupPage;
