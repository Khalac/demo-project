import { LoginSchema } from "@/schema/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { User } from "@/data/user.data";
import { z } from "zod";
import { useContext, useState } from "react";
import { IsLoginedContext } from "@/context/IsLogined";
import "./LogInForm.scss";
import { useNavigate } from "react-router-dom";

type LoginSchema = z.infer<typeof LoginSchema>;

const LogInForm = () => {
  const nav = useNavigate();
  const [errorPass, setErrorPass] = useState("");
  const { changeLogin } = useContext(IsLoginedContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });
  const onSubmit: SubmitHandler<LoginSchema> = (data) => {
    const user = User.find((user) => user.email === data.email);
    if (!user) setErrorPass("User not found");
    else {
      if (user?.password !== data.password)
        setErrorPass("Password is incorrect");
      else {
        changeLogin(), nav("/");
      }
    }
  };
  return (
    <div className="loginform_container">
      <div className="loginform_title">LOG IN</div>
      <form onSubmit={handleSubmit(onSubmit)} className="loginform">
        <div className="forminput">
          <input {...register("email")} placeholder="Email" />
          {errors && <span>{errors.email?.message}</span>}
        </div>
        <div className="forminput">
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
          />
          {errorPass && <span>{errorPass}</span>}
          {errors && <span>{errors.password?.message}</span>}
        </div>
        <button type="submit">Log In</button>
      </form>
      <div className="loginform_createaccount">
        <div>Don't have an account?</div>
        <button onClick={() => nav("/signup")}>Create an Account</button>
      </div>
    </div>
  );
};

export default LogInForm;
