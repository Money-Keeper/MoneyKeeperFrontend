import Link from "next/link"
import { ReactNode } from "react"
import useSWRMutation from "swr/mutation"
import { ApiPath, fetcher } from "@lib/fetcher"
import AuthLayout from "../layouts/auth-layout"
import Head from "next/head"
import Button from "@mk/ui/button"
import { z } from "zod"
import { Form, FormField, useForm } from "@mk/ui/form"
import Input from "@mk/ui/input"
import Divider from "@mk/ui/divider"
import Space from "@mk/ui/space"

export default function LoginPage() {
  return (
    <div className="card w-full w-96 max-w-sm flex-shrink-0 bg-base-100 shadow-2xl">
      <div className="card-body">
        <LoginForm />

        <Divider>OR</Divider>

        <Button as={Link} href="/signup" intend="link">
          Go to Sign Up page
        </Button>
      </div>
    </div>
  )
}

const loginSchema = z.object({
  login: z.string().email(),
  password: z.string().min(8).max(60),
})

function LoginForm() {
  const { trigger, isMutating } = useSWRMutation(
    ApiPath.login,
    (url, credentials) => fetcher.post(url, credentials),
    { throwOnError: false },
  )

  const form = useForm({ schema: loginSchema })

  return (
    <Form
      form={form}
      onSubmit={(values) => {
        console.log(values.login)
        trigger(values)
      }}
    >
      <Space direction="column" gap="medium">
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

        <Button type="submit" intend="primary" loading={isMutating}>
          Login
        </Button>
      </Space>
    </Form>
  )
}

LoginPage.getLayout = function getLayout(page: ReactNode) {
  return (
    <AuthLayout>
      <Head>
        <title>Login | MoneyKeeper</title>
      </Head>
      {page}
    </AuthLayout>
  )
}
