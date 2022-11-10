import { ReactNode } from "react"
import Head from "next/head"
import AuthLayout from "@layouts/auth-layout"
import NewWalletForm from "@features/wallets/new-wallet-form"
import Space from "@mk/ui/components/space"

export default function NewWalletPage() {
  return (
    <div className="align-center mt-5 flex flex-col gap-8">
      <h1 className="text-4xl font-bold">{`Hey! Let\'s create your first wallet`}</h1>

      <Space className="gap-10" direction="row">
        <div className="card w-full shadow-2xl bg-base-100">
          <div className="card-body">
            <NewWalletForm />
          </div>
        </div>
      </Space>
    </div>
  )
}

NewWalletPage.getLayout = (page: ReactNode) => (
  <AuthLayout>
    <Head>
      <title>New Wallet | MoneyKeeper</title>
    </Head>
    {page}
  </AuthLayout>
)
