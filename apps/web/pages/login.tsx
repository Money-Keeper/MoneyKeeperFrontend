import Link from "next/link"
import { ReactNode } from "react"
import AuthLayout from "../layouts/auth-layout"
import Head from "next/head"
import Button from "packages/ui/components/button"
import Divider from "packages/ui/components/divider"
import LoginForm from "features/auth/login-form"

export default function LoginPage() {
  return (
    <div className="card w-full w-96 max-w-sm flex-shrink-0 bg-base-100 shadow-2xl">
      <div className="card-body">
        <LoginForm />

        <Divider>OR</Divider>

        <Button as={Link} href="/signup" intend="link">
          Join us today
        </Button>
      </div>
    </div>
  )
}

LoginPage.getLayout = function getLayout(page: ReactNode) {
  return (
    <AuthLayout>
      <Head>
        <title>Login | MoneyKeeper</title>
      </Head>

      {page}
    </AuthLayout>
  )
}
