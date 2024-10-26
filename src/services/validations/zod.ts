import * as z from "zod";

export const LoginFormSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(7, "Password should be at least 7 characters")
      .refine((values) => /[a-zA-Z]/.test(values), {
        message: "Password must contain letters.",
      })
      .refine((s) => /\d/.test(s), {
        message: "Password must contain numbers.",
      })
      .refine((s) => /[!@#$%^&*(),.?":{}|<>]/.test(s), {
        message: "Password must contain special characters.",
      }),
  });



export  const signupFormSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long")
      .refine(s => /^[a-zA-Z0-9_-]+$/.test(s), {
        message: "Only letters,No characters allowed",
      }),
    email: z.string().email("Invalid email address"),
    password: z.string()
      .min(7, "Password should be at least 7 characters")
      .refine(s => /[a-zA-Z]/.test(s), {
        message: "Password must contain letters.",
      })
      .refine(s => /\d/.test(s), {
        message: "Password must contain numbers.",
      })
      .refine(s => /[!@#$%^&*(),.?":{}|<>]/.test(s), {
        message: "Password must contain special characters.",
      }),
      confirmPassword: z.string()
    .min(7, "Confirm Password should be at least 7 characters"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});



export const studentSchema = z.object({
  profilePic: z.union([z.instanceof(File), z.string().url()]).optional().refine((file) => file, "Profile picture is required"),
  name: z.string().min(1, "Name is required").regex(/^[A-Za-z\s]+$/, "Only alphabets are allowed"),
  dob: z.string().min(1, "Date of Birth is required"),
  age: z.string().min(1, "Age is required"),
  className: z.string().min(1, "Class is required"),
});