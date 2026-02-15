import z from "zod";

export const SignupSchema = z
  .object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a valid text",
      })
      .min(3, "Name must be at least 3 characters long")
      .max(20, "Name can be at most 20 characters"),

    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a valid text",
      })
      .email("Please enter a valid email address")
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address",
      ),
    role: z.enum(["employee", "patient", "doctor", "admin"]),
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a valid text",
      })
      .min(8, "Password must be at least 8 characters long")
      .max(20, "Password cannot exceed 20 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must include at least 1 uppercase, 1 lowercase, 1 number and 1 special character",
      ),

    confirmPassword: z.string({
      required_error: "Confirm Password is required",
      invalid_type_error: "Confirm Password must be a valid text",
    }),
  })

  // Password & confirm password match logic
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const LoginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a valid text",
    })
    .email("Please enter a valid email address")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address",
    ),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a valid text",
    })
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password cannot exceed 20 characters"),
});
