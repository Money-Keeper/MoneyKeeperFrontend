import Link from "next/link"
import { FormEvent, ReactNode, useCallback } from "react"
import useSWRMutation from "swr/mutation"
import { ApiPath, fetcher } from "@lib/fetcher"
import AuthLayout from "@layouts/auth-layout"
import Head from "next/head"

export default function LoginPage() {
  const { trigger, isMutating } = useSWRMutation(
    ApiPath.login,
    (url, credentials) => fetcher.post(url, credentials),
  )

  const onLogin = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const credentials = Object.fromEntries(formData.entries())
      const data = trigger(credentials)
      console.log(data)
    },
    [trigger],
  )

  return (
    <div className="card w-full w-96 max-w-sm flex-shrink-0 bg-base-100 shadow-2xl">
      <div className="card-body">
        <form onSubmit={onLogin}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              value="login"
              placeholder="email"
              className="input-bordered input"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="text"
              value="password"
              placeholder="password"
              className="input-bordered input"
            />
            {/*<label className="label">*/}
            {/*  <a href="#" className="link-hover label-text-alt link">*/}
            {/*    Forgot password?*/}
            {/*  </a>*/}
            {/*</label>*/}
          </div>

          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn-primary btn"
              disabled={isMutating}
            >
              Login
            </button>
          </div>
        </form>

        <div className="btn-link btn">
          <Link href="/signup">Go to Sign Up page</Link>
        </div>
      </div>
    </div>
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
