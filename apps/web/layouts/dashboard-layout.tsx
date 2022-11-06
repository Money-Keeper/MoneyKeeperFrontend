import { PropsWithChildren } from "react"
import BaseLayout from "./base-layout"

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <BaseLayout>
      <div className="min-h-screen">
        <div className="navbar bg-base-200 px-5">
          <a className="btn-ghost btn text-xl normal-case">Money Keeper</a>
        </div>

        <div className="container mx-auto">{children}</div>
      </div>
    </BaseLayout>
  )
}
