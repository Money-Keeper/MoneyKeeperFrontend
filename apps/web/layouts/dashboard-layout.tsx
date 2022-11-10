import { PropsWithChildren } from "react"
import AuthLayout from "@layouts/auth-layout"
import { WalletsGuard } from "@features/wallets/wallets-store"

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <AuthLayout>
      <WalletsGuard>{children}</WalletsGuard>
    </AuthLayout>
  )
}
