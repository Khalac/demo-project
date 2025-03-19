import { z } from "zod";
import { SignUpSchema } from "@/schema/signup.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import "./SignUpForm.scss";

type SignUpSchema = z.infer<typeof SignUpSchema>;

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpSchema> = () => {};
  return (
    <div className="signupform_container">
      <form onSubmit={handleSubmit(onSubmit)} className="signupform">
        <div className="forminput">
          <label>Name</label>
          <input {...register("name")} />
        </div>
        <div className="forminput">
          <label>Email</label>
          <input {...register("email")} />
          {errors && <span>{errors.email?.message}</span>}
        </div>
        <div className="forminput">
          <label>Password</label>
          <input type="password" {...register("password")} />
          {errors && <span>{errors.password?.message}</span>}
        </div>
        <div className="forminput">
          <label>Password</label>
          <input type="password" {...register("repassword")} />
          {errors && <span>{errors.repassword?.message}</span>}
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
