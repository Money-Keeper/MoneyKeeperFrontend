import { PropsWithChildren } from "react"
import BaseLayout from "./base-layout"

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <BaseLayout>
      <div className="hero min-h-screen">
        <div className="hero-content w-3/5 flex-col">
          <div className="text-center">
            <h1 className="text-5xl font-bold">Money Keeper</h1>
          </div>

          {children}
        </div>
      </div>
    </BaseLayout>
  )
}
