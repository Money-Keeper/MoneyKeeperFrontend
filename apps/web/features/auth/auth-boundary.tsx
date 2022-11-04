import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { PropsWithChildren, useEffect, useState } from "react"

function useAuth() {
  const { data: session } = useSession()
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    if (session === null) {
      if (router.route !== "/login") {
        router.replace("/login")
      }
      setIsAuthenticated(false)
    } else if (session !== undefined) {
      if (router.route === "/login") {
        router.replace("/")
      }
      setIsAuthenticated(true)
    }
  }, [session, router])

  return isAuthenticated
}

export default function AuthBoundary({ children }: PropsWithChildren) {
  const isAuthenticated = useAuth()

  return isAuthenticated ? <>{children}</> : null
}
