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
      <form onSubmit={handleSubmit(onSubmit)} className="loginform">
        <div className="forminput">
          <label>Email</label>
          <input {...register("email")} />
          {errors && <span>{errors.email?.message}</span>}
        </div>
        <div className="forminput">
          <label>Password</label>
          <input type="password" {...register("password")} />
          {errorPass && <span>{errorPass}</span>}
          {errors && <span>{errors.password?.message}</span>}
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LogInForm;
