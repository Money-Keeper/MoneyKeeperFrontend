import { useSession } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import { PropsWithChildren, useEffect, useState } from "react"

function useAuth() {
  const { data: session } = useSession()
  const router = useRouter()
  const route = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    if (session === null) {
      if (route !== "/login") {
        router.replace("/login")
      }
      setIsAuthenticated(false)
    } else if (session !== undefined) {
      if (route === "/login") {
        router.replace("/")
      }
      setIsAuthenticated(true)
    }
  }, [session, router, route])

  return isAuthenticated
}

export default function AuthBoundary({ children }: PropsWithChildren) {
  const isAuthenticated = useAuth()

  return isAuthenticated ? <>{children}</> : null
}
