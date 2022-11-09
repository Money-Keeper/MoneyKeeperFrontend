import createContext from "@mk/ui/context"
import {
  FC,
  PropsWithChildren,
  startTransition,
  useCallback,
  useEffect,
  useState,
} from "react"
import Cookies from "js-cookie"
import fetcher from "@lib/fetcher"
import { useRouter } from "next/router"

interface User {
  email: string
  name: string
}

type AuthStatus = "loading" | "authenticated" | "unauthenticated"

interface SessionContext {
  status: AuthStatus
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

const [SessionContextProvider, useSession] =
  createContext<SessionContext>("SessionContext")

const SessionProvider: FC<
  PropsWithChildren<{ providers: AuthSessionProvider[] }>
> = ({ providers, children }) => {
  const [status, setStatus] = useState<AuthStatus>("unauthenticated")
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    async function loadUserFromCookies() {
      const { token, id } = JSON.parse(Cookies.get("mk_auth_token") || "{}")

      if (!token || !id) {
        return
      }

      const provider = providers.find((p) => p.id === id)
      if (!provider) {
        throw new Error(`Provider ${id} not found`)
      }

      setStatus("loading")

      fetcher.setToken(token)
      const user = await provider.getUser()

      if (user) {
        startTransition(() => {
          setUser(user)
          setStatus("authenticated")
        })
      } else {
        setStatus("unauthenticated")
      }
    }
    loadUserFromCookies()
  }, [providers])

  return (
    <SessionContextProvider
      status={status}
      user={user}
      isAuthenticated={status === "authenticated"}
      isLoading={status === "loading"}
    >
      <AuthSessionProviderList providers={providers}>
        <AuthProvider setStatus={setStatus} setUser={setUser}>
          {children}
        </AuthProvider>
      </AuthSessionProviderList>
    </SessionContextProvider>
  )
}

interface AuthContextOptions {
  callbackUrl?: string
}

interface AuthContext {
  signIn: (
    providerId: string,
    data: { token: string },
    options?: AuthContextOptions,
  ) => Promise<void>
  logout: (options?: AuthContextOptions) => void
}

const [AuthContextProvider, useAuth] = createContext<AuthContext>("AuthContext")

const AuthProvider: FC<
  PropsWithChildren<{
    setUser: (user: User | null) => void
    setStatus: (status: AuthStatus) => void
  }>
> = ({ setUser, setStatus, children }) => {
  const { providers } = useAuthProviders()
  const router = useRouter()

  const signIn = useCallback(
    async (
      id: string,
      { token }: { token: string },
      options: AuthContextOptions = {},
    ) => {
      const provider = providers.find((p) => p.id === id)

      if (!provider) {
        throw new Error(`Provider ${id} not found`)
      }

      setStatus("loading")
      try {
        fetcher.setToken(token)
        Cookies.set("mk_auth_token", JSON.stringify({ token, id }), {
          expires: 60,
        })
        const user = await provider.getUser()

        if (user) {
          startTransition(() => {
            setUser(user)
            setStatus("authenticated")
          })
        }

        await router.push(options.callbackUrl || "/")
      } catch (error) {
        setStatus("unauthenticated")
        throw error
      }
    },
    [setUser, setStatus, providers, router],
  )

  const logout = useCallback(
    (options: { callbackUrl?: string } = {}) => {
      Cookies.remove("mk_auth_token")
      setUser(null)
      fetcher.removeToken()
      window.location.pathname = options.callbackUrl || "/login"
    },
    [setUser],
  )

  return (
    <AuthContextProvider signIn={signIn} logout={logout}>
      {children}
    </AuthContextProvider>
  )
}

interface AuthSessionProvider {
  id: string
  getUser: () => Promise<User>
}

const [AuthSessionProviderList, useAuthProviders] = createContext<{
  providers: AuthSessionProvider[]
}>("AuthProvidersContext")

export { SessionProvider, useSession, useAuth }
export type { AuthSessionProvider, User }
