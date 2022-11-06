import { useToast } from "@lib/toast"
import { useMutation } from "@tanstack/react-query"
import { signIn } from "next-auth/react"
import { ValidationError } from "@mk/fetcher"

const HOST_NAME =
  process.env.VERSEL_ENV === `production` ||
  process.env.VERSEL_ENV === `preview`
    ? process.env.VERCEL_URL
    : "http://localhost:3000"

function useMoneyKeeperSignIn<T = unknown>(
  fetchToken: (data: T) => Promise<{ data: { token: string } }>,
) {
  const pushToast = useToast((s) => s.push)

  const { mutate, isLoading, error } = useMutation({
    mutationFn: fetchToken,
    onSuccess: async ({ data }) => {
      alert(JSON.stringify(data))
      console.log(HOST_NAME)
      await signIn(
        "money-keeper",
        { accessToken: data.token },
        { callbackUrl: `${window.location.origin}/dashboard` },
      )
      pushToast({ message: "Welcome onboard!", type: "success" })
    },
  })

  return {
    loading: isLoading,
    mutate,
    errors: (error instanceof ValidationError && error.errors) || {},
  }
}

export { useMoneyKeeperSignIn }
