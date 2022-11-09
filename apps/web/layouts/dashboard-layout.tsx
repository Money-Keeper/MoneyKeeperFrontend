import { PropsWithChildren } from "react"
import BaseLayout from "./base-layout"
import NavigationBar from "./navigation-bar"

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <BaseLayout>
      <div className="min-h-screen">
        <NavigationBar />

        <div className="container mx-auto">{children}</div>
      </div>
    </BaseLayout>
  )
}
