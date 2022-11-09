import { z } from "zod"

type LoginRequest = z.infer<typeof loginSchema>

const loginSchema = z.object({
  login: z
    .string({ required_error: "Login is required" })
    .trim()
    .email({ message: "Invalid email" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password should have at least 8 character" })
    .max(60, { message: "Password should have less than 60 characters" }),
})

type SignupRequest = z.infer<typeof signupSchema>

const signupSchema = z
  .object({
    name: z
      .string({ required_error: "Name is required" })
      .trim()
      .min(8, { message: "Name should have at least 8 character" })
      .max(64, { message: "Name should have less than 64 characters" }),
  })
  .merge(loginSchema)

export { loginSchema, signupSchema }
export type { LoginRequest, SignupRequest }
