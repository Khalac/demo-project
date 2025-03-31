import { z } from "zod";

export const SignUpSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email address" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(1, { message: "Password is required" })
      .regex(new RegExp(/[A-Z]/), "Must have at least one uppercase letter")
      .regex(new RegExp(/[a-z]/), "Must have at least one lowercase letter")
      .regex(new RegExp(/[0-9]/), "Must have at least one number")
      .regex(
        new RegExp(/[!@#$%^&*-]/),
        "Must have at least one special character in (!@#$%^&*-)"
      )
      .min(6, "Must have at least 6 characters")
      .max(30, "Must have maximum 30 characters"),
    repassword: z.string(),
  })
  .superRefine(
    (
      { password, repassword }: { password: string; repassword: string },
      ctx
    ) => {
      if (password != repassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Repassword incorrect",
          path: ["repassword"],
        });
      }
    }
  );
