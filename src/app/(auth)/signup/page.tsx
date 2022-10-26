import Link from "next/link"
import useSWRMutation from "swr/mutation"
import { ApiPath, request } from "../../../request"
import { useCallback } from "react"
import { signIn } from "next-auth/react"

export default function SignUpPage() {
  const { trigger } = useSWRMutation(
    ApiPath.signUp,
    (url, credentials) => request.post(url, credentials),
    {
      throwOnError: false,
    },
  )

  const onSignIn = useCallback(() => {
    trigger({ test: "sss" }).then(async (response) => {
      console.log(response)
      await signIn("money-keeper", response?.data)
    })
  }, [trigger])

  return (
    <div className="card w-full max-w-sm flex-shrink-0 bg-base-100 shadow-2xl">
      Not implemented
      <div className="btn-link btn">
        <Link href="/login">Go to Login page</Link>
      </div>
    </div>
  )
}
