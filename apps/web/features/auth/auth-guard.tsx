import { PropsWithChildren } from "react"
import { useSession } from "./auth-context"
import { useRouter } from "next/router"

const authPages = ["/login", "/signup"]

export default function AuthGuard({ children }: PropsWithChildren) {
  const { status } = useSession()
  const { route } = useRouter()

  if (
    status === "loading" ||
    (status === "unauthenticated" && !authPages.includes(route))
  ) {
    return <div></div>
  }

  return <>{children}</>
}
