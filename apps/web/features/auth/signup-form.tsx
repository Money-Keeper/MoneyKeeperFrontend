import { Form, FormField, useForm } from "packages/ui/components/form"
import Input from "packages/ui/components/input"
import Button from "packages/ui/components/button"
import { SignupRequest, signupSchema } from "./auth-schema"
import { useMoneyKeeperSignIn } from "./provider-hooks"
import fetcher from "@lib/fetcher"
import { ApiPath } from "@server/path"

const signupUser = async (data: SignupRequest) => {
  return fetcher.post<{ token: string }>(ApiPath.register, {
    data,
  })
}

function SignupForm() {
  const { mutate: signup, loading, errors } = useMoneyKeeperSignIn(signupUser)
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
