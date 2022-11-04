import { z } from "zod"
import { Form, FormField, useForm } from "@mk/ui/form"
import Input from "@mk/ui/input"
import Button from "@mk/ui/button"
import { useToastStore } from "@lib/toast"
import useSWRMutation from "swr/mutation"
import fetcher, { ApiPath } from "@lib/fetcher"
import { signIn } from "next-auth/react"

export const loginSchema = z.object({
  login: z
    .string({ required_error: "Login is required" })
    .trim()
    .email({ message: "Invalid email" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password should have at least 8 character" })
    .max(60, { message: "Password should have less than 60 characters" }),
})

function useLoginRequest() {
  const pushToast = useToastStore((s) => s.push)

  const { trigger, isMutating, error } = useSWRMutation(
    ApiPath.login,
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
        pushToast({ message: "Logged in successfully", type: "success" }),
    },
  )

  return { loading: isMutating, login: trigger, errors: error?.errors || {} }
}

function LoginForm() {
  const { loading, errors, login } = useLoginRequest()
  const form = useForm({ schema: loginSchema })

  return (
    <Form
      form={form}
      serverErrors={errors}
      onSubmit={(values) => {
        console.log(values)
        login(values)
      }}
    >
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
        Login
      </Button>
    </Form>
  )
}

export default LoginForm
