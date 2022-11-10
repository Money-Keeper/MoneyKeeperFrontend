import Link from "next/link"
import { ReactNode } from "react"
import UnauthLayout from "@layouts/unauth-layout"
import Head from "next/head"
import Button from "@mk/ui/components/button"
import Divider from "@mk/ui/components/divider"
import { LoginForm } from "@features/auth/components"

export default function LoginPage() {
  return (
    <div className="card w-full w-96 max-w-sm flex-shrink-0 bg-base-100 shadow-2xl">
      <div className="card-body">
        <LoginForm />

        <Divider>OR</Divider>

        <Button as={Link} href="/signup" intend="link">
          Sign up now
        </Button>
      </div>
    </div>
  )
}

LoginPage.getLayout = function getLayout(page: ReactNode) {
  return (
    <UnauthLayout>
      <Head>
        <title>Login | MoneyKeeper</title>
      </Head>

      {page}
    </UnauthLayout>
  )
}
