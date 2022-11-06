import { useToast } from "@lib/toast"
import { useMutation } from "@tanstack/react-query"
import { signIn } from "next-auth/react"
import { ValidationError } from "@mk/fetcher"

function useMoneyKeeperSignIn<T = unknown>(
  fetchToken: (data: T) => Promise<{ data: { token: string } }>,
) {
  const pushToast = useToast((s) => s.push)

  const { mutate, isLoading, error } = useMutation({
    mutationFn: fetchToken,
    onSuccess: async ({ data }) => {
      pushToast({ message: "Welcome onboard!", type: "success" })
      await signIn(
        "money-keeper",
        { accessToken: data.token },
        { callbackUrl: `${window.location.origin}/dashboard` },
      )
    },
  })

  return {
    loading: isLoading,
    mutate,
    errors: (error instanceof ValidationError && error.errors) || {},
  }
}

export { useMoneyKeeperSignIn }
