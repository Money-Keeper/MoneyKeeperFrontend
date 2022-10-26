import Link from "next/link"
import { useCallback } from "react"
// import { signIn } from "next-auth/react"

export default function LoginPage() {
  // const {} = useSWRMutation(ApiPath.signIn)

  const onSignIn = useCallback(() => {
    // signIn("money-keeper")
  }, [])

  return (
    <div className="card w-full w-96 max-w-sm flex-shrink-0 bg-base-100 shadow-2xl">
      <div className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="text"
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
            placeholder="password"
            className="input-bordered input"
          />
          <label className="label">
            <a href="#" className="link-hover label-text-alt link">
              Forgot password?
            </a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn-primary btn">Login</button>
        </div>

        <div className="btn-link btn">
          <Link href="/signup">Go to Sign Up page</Link>
        </div>
      </div>
    </div>
  )
}
