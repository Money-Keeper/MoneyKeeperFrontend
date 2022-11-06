import { useSession } from "next-auth/react"
import { PropsWithChildren, useEffect, useState } from "react"
import { useRouter } from "next/router"

const authPages = ["/login", "/signup"]

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
      if (authPages.includes(router.route)) {
        router.replace("/dashboard")
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
