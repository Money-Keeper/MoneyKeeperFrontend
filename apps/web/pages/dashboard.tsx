import { ReactNode } from "react"
import Head from "next/head"
import DashboardLayout from "@layouts/dashboard-layout"

export default function DashboardPage() {
  return (
    <div className="align-center mt-5 flex flex-col">
      <h1 className="text-5xl font-bold text-center">I am dashboard</h1>
    </div>
  )
}

DashboardPage.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    <Head>
      <title>Dashboard | MoneyKeeper</title>
    </Head>
    {page}
  </DashboardLayout>
)
