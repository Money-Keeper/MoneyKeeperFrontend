import Link from "next/link"
import { ReactNode } from "react"
import AuthLayout from "../layouts/auth-layout"
import Head from "next/head"
import Button from "packages/ui/components/button"
import Divider from "packages/ui/components/divider"
import SignupForm from "features/auth/signup-form"

export default function SignUpPage() {
  return (
    <div className="card w-full w-96 max-w-sm flex-shrink-0 bg-base-100 shadow-2xl">
      <div className="card-body">
        <SignupForm />

        <Divider>Already have an account?</Divider>

        <Button as={Link} href="/login" intend="link">
          Go to the Login page
        </Button>
      </div>
    </div>
  )
}

SignUpPage.getLayout = function getLayout(page: ReactNode) {
  return (
    <AuthLayout>
      <Head>
        <title>Sign Up | MoneyKeeper</title>
      </Head>
      {page}
    </AuthLayout>
  )
}
