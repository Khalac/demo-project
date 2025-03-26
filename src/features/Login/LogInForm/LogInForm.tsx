import { LoginSchema } from "@/features/Login/model/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

import { z } from "zod";
import { useContext, useState } from "react";
import { AuthContext } from "@/features/context/AuthContext";
import "./LogInForm.scss";
import { useNavigate } from "react-router-dom";

type LoginSchema = z.infer<typeof LoginSchema>;

const LogInForm = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchema> = (data) => {
    if (login(data)) {
      navigate("/");
    } else {
      setError("Email or password is incorrect");
    }
  };

  return (
    <div className="login-form">
      <div className="login-form__title">LOG IN</div>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form__form">
        <div className="login-form__input-group">
          <input {...register("email")} placeholder="Email" />
          {errors.email && (
            <span className="login-form__input-group--error">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="login-form__input-group">
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
          />
          {error && (
            <span className="login-form__input-group--error">{error}</span>
          )}
          {errors.password && (
            <span className="login-form__input-group--error">
              {errors.password.message}
            </span>
          )}
        </div>
        <button type="submit" className="login-form__button">
          Log In
        </button>
      </form>
      <div className="login-form__footer">
        <div className="login-form__footer-text">Don't have an account?</div>
        <button
          onClick={() => navigate("/signup")}
          className="login-form__button login-form__button--outline"
        >
          Create an Account
        </button>
      </div>
    </div>
  );
};

export default LogInForm;
