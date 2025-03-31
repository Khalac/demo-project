import { z } from "zod";
import { SignUpSchema } from "@/features/signup/model/signup.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import "./SignUpForm.scss";
import { AuthContext } from "@/features/context/AuthContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

type SignUpSchema = z.infer<typeof SignUpSchema>;

const SignUpForm = () => {
  const navigate = useNavigate();
  const { signUp } = useContext(AuthContext);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpSchema),
  });
  console.log(errors);
  const onSubmit: SubmitHandler<SignUpSchema> = (data) => {
    if (signUp(data)) {
      navigate("/login");
    } else {
      setError("User already exists");
    }
  };

  return (
    <div className="signup-form">
      <div className="signup-form__title">SIGN UP</div>
      <form onSubmit={handleSubmit(onSubmit)} className="signup-form__form">
        <div className="signup-form__input-group">
          <input {...register("name")} placeholder="Name" />
          {errors.name && (
            <span className="signup-form__input-group--error">
              {errors.name.message}
            </span>
          )}
        </div>
        <div className="signup-form__input-group">
          <input {...register("email")} placeholder="Email" />
          {errors.email && (
            <span className="signup-form__input-group--error">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="signup-form__input-group">
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
          />
          {errors.password && (
            <span className="signup-form__input-group--error">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="signup-form__input-group">
          <input
            type="password"
            {...register("repassword")}
            placeholder="Re-password"
          />
          {errors.repassword && (
            <span className="signup-form__input-group--error">
              {errors.repassword.message}
            </span>
          )}
        </div>
        {error && (
          <span className="signup-form__input-group--error">{error}</span>
        )}
        <button type="submit" className="signup-form__button">
          Sign Up
        </button>
      </form>
      <div className="signup-form__footer">
        <div className="signup-form__footer-text">Already have an account?</div>
        <button
          onClick={() => navigate("/login")}
          className="signup-form__button signup-form__button--outline"
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;
