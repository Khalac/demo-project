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
      <div className="signupform_title">SIGN UP</div>
      <form onSubmit={handleSubmit(onSubmit)} className="signupform">
        <div className="forminput">
          <input {...register("name")} placeholder="Name" />
        </div>
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
          {errors && <span>{errors.password?.message}</span>}
        </div>
        <div className="forminput">
          <input
            type="password"
            {...register("repassword")}
            placeholder="Re-password"
          />
          {errors && <span>{errors.repassword?.message}</span>}
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
