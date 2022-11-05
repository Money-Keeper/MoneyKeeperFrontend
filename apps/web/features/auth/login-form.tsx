import { Form, FormField, useForm } from "packages/ui/components/form"
import Input from "packages/ui/components/input"
import Button from "packages/ui/components/button"
import { LoginRequest, loginSchema } from "./auth-schema"
import { useMoneyKeeperSignIn } from "./provider-hooks"
import fetcher from "@lib/fetcher"
import { ApiPath } from "@server/path"

const loginUser = async (data: LoginRequest) => {
  return fetcher.post<{ token: string }>(ApiPath.login, {
    data,
  })
}

function LoginForm() {
  const { mutate: login, loading, errors } = useMoneyKeeperSignIn(loginUser)
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
