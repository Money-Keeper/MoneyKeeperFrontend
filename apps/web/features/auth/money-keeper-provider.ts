import { AuthSessionProvider, useAuth, User } from "./auth-context"
import fetcher from "@lib/fetcher"
import { ApiPath } from "@server/path"
import { useToast } from "@lib/toast"
import { useMutation } from "@tanstack/react-query"
import { ValidationError } from "@mk/fetcher"

const MoneyKeeperProvider: AuthSessionProvider = {
  id: "money-keeper",
  getUser: async () => {
    const { data } = await fetcher.get<User>(ApiPath.user)
    return data
  },
}

function useMoneyKeeperSignIn<T = unknown>(
  fetchToken: (data: T) => Promise<{ data: { token: string } }>,
) {
  const { signIn } = useAuth()
  const pushToast = useToast((s) => s.push)

  const { mutate, isLoading, error } = useMutation({
    mutationFn: fetchToken,
    onSuccess: async ({ data }) => {
      await signIn(
        "money-keeper",
        { token: data.token },
        { callbackUrl: `/dashboard` },
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

export { MoneyKeeperProvider, useMoneyKeeperSignIn }
