import { Form, FormField, useForm } from "@mk/ui/components/form"
import Input from "@mk/ui/components/input"
import Button from "@mk/ui/components/button"
import { LoginRequest, loginSchema } from "./auth-schema"
import { useMoneyKeeperSignIn } from "../money-keeper-provider"
import fetcher from "@lib/fetcher"
import { ApiPath } from "@server/path"

const loginUser = async (data: LoginRequest) => {
  return await fetcher.post<{ token: string }>(ApiPath.login, {
    data,
  })
}

function LoginForm() {
  const { mutate: login, loading, errors } = useMoneyKeeperSignIn(loginUser)
  const form = useForm({ schema: loginSchema, reValidateMode: "onChange" })

  return (
    <Form form={form} serverErrors={errors} onSubmit={login}>
      <FormField>
        <FormField.Label>Email</FormField.Label>
        <Input
          type="text"
          placeholder="Input email"
          {...form.register("login")}
        />
      </FormField>

      <FormField>
        <FormField.Label>Password</FormField.Label>
        <Input
          type="password"
          placeholder="Password"
          {...form.register("password")}
        />
      </FormField>

      <Button className="mt-5" type="submit" intend="primary" loading={loading}>
        Login
      </Button>
    </Form>
  )
}

export default LoginForm
