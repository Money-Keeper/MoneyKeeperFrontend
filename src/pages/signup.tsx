import Link from "next/link"
import useSWRMutation from "swr/mutation"
import { ApiPath, fetcher } from "@lib/fetcher"
import { FormEvent, ReactNode, useCallback } from "react"
import AuthLayout from "@layouts/auth-layout"
import Head from "next/head"

export default function SignUpPage() {
  const { trigger, isMutating } = useSWRMutation(
    ApiPath.register,
    (url, credentials) => fetcher.post(url, credentials),
  )

  const onSignIn = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const credentials = Object.fromEntries(formData.entries())
      const data = await trigger(credentials)
      console.log(data)
    },
    [trigger],
  )

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
            <button
              type="submit"
              className="btn-primary btn"
              disabled={isMutating}
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="btn-link btn">
          Already have an account? <Link href="/login">Login page</Link>
        </div>
      </div>
    </div>
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
