import { z } from "zod"
import { loginSchema } from "./login-form"
import { Form, FormField, useForm } from "@mk/ui/form"
import Input from "@mk/ui/input"
import Button from "@mk/ui/button"
import { useToastStore } from "@lib/toast"
import useSWRMutation from "swr/mutation"
import fetcher, { ApiPath } from "@lib/fetcher"
import { signIn } from "next-auth/react"

const signupSchema = z
  .object({
    name: z
      .string({ required_error: "Name is required" })
      .trim()
      .min(1, { message: "Please provide valid name" })
      .max(64, { message: "Password should have less than 64 characters" }),
  })
  .merge(loginSchema)

function useSignupRequest() {
  const pushToast = useToastStore((s) => s.push)

  const { trigger, isMutating, error } = useSWRMutation(
    ApiPath.register,
    async (url, credentials) => {
      const { data } = await fetcher.post<{ token: string }>(url, {
        data: credentials,
      })

      if (data.token) {
        await signIn("money-keeper", { accessToken: data.token })
      }
    },
    {
      throwOnError: false,
      onSuccess: () =>
        pushToast({ message: "Welcome onboard!", type: "success" }),
    },
  )

  return { loading: isMutating, signup: trigger, errors: error?.errors || {} }
}

function SignupForm() {
  const { loading, signup, errors } = useSignupRequest()

  const form = useForm({ schema: signupSchema })

  return (
    <Form
      form={form}
      serverErrors={errors}
      onSubmit={(values) => {
        console.log(values.login)
        signup(values)
      }}
    >
      <FormField label="Name">
        <Input type="text" placeholder="Name" {...form.register("name")} />
      </FormField>

      <FormField label="Email">
        <Input
          type="text"
          placeholder="Input email"
          {...form.register("login")}
        />
      </FormField>

      <FormField label="Password">
        <Input
          type="text"
          placeholder="Password"
          {...form.register("password")}
        />
      </FormField>

      <Button type="submit" intend="primary" loading={loading}>
        Sign Up
      </Button>
    </Form>
  )
}

export default SignupForm
