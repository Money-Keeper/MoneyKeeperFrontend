import Link from "next/link"
import useSWRMutation from "swr/mutation"
import { ApiPath, fetcher } from "@lib/fetcher"
import { ReactNode } from "react"
import AuthLayout from "../layouts/auth-layout"
import Head from "next/head"
import Button from "@mk/ui/button"
import { z } from "zod"
import { Form, useForm } from "@mk/ui/form"
import Space from "@mk/ui/space"

export default function SignUpPage() {
  return (
    <div className="card w-full w-96 max-w-sm flex-shrink-0 bg-base-100 shadow-2xl">
      <div className="card-body">
        <form onSubmit={onSignIn}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="email"
              value="login"
              className="input-bordered input"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="password"
              value="name"
              className="input-bordered input"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              value="password"
              className="input-bordered input"
            />
          </div>

          <div className="form-control mt-6">
            <Button type="submit" intend="primary" disabled={isMutating}>
              Sign Up
            </Button>
          </div>
        </form>

        <div className="btn-link btn">
          Already have an account?
          <Link href="/login">Login page</Link>
        </div>
      </div>
    </div>
  )
}

const signupSchema = z.object({
  name: z.string().min(1).max(64),
  login: z.string().email(),
  password: z.string().min(8).max(60),
})

function SignupForm() {
  const { trigger, isMutating } = useSWRMutation(
    ApiPath.register,
    (url, credentials) => fetcher.post(url, credentials),
  )

  const form = useForm({ schema: signupSchema })

  return (
    <Form
      form={form}
      onSubmit={(values) => {
        console.log(values.login)
        trigger(values)
      }}
    >
      <Space direction="column" gap="medium"></Space>
    </Form>
  )
}

SignUpPage.getLayout = function getLayout(page: ReactNode) {
  return (
    <AuthLayout>
      <Head>
        <title>Sign Up | MoneyKeeper</title>
      </Head>
      {page}
    </AuthLayout>
  )
}
