import Button from "@mk/ui/components/button"
import Space from "@mk/ui/components/space"
import { PropsWithChildren } from "react"
import BaseLayout from "./base-layout"
import { useAuth } from "../features/auth/auth-context"

export default function DashboardLayout({ children }: PropsWithChildren) {
  const { logout } = useAuth()

  return (
    <BaseLayout>
      <div className="min-h-screen">
        <div className="navbar bg-base-200 px-5 justify-between">
          <Button intend="ghost">Money Keeper</Button>

          <Button intend="ghost" onClick={() => logout()}>
            Sign Out
          </Button>
        </div>

        <div className="container mx-auto">{children}</div>
      </div>
    </BaseLayout>
  )
}
