import Link from "next/link"
import { ReactNode } from "react"
import UnauthLayout from "@layouts/unauth-layout"
import Head from "next/head"
import Button from "@mk/ui/components/button"
import Divider from "@mk/ui/components/divider"
import { SignupForm } from "@features/auth/components"

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
    <UnauthLayout>
      <Head>
        <title>Sign Up | MoneyKeeper</title>
      </Head>
      {page}
    </UnauthLayout>
  )
}
