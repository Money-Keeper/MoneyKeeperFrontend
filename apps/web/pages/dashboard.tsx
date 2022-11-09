import { ReactNode } from "react"
import Head from "next/head"
import DashboardLayout from "@layouts/dashboard-layout"
import { useSession } from "features/auth"

export default function DashboardPage() {
  return (
    <div className="align-center mt-5 flex flex-col">
      <h1 className="text-5xl font-bold text-center">I am dashboard</h1>
      <DashboardCard />
    </div>
  )
}

function DashboardCard() {
  const { user } = useSession()

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title break-all">{JSON.stringify(user)}</h2>
      </div>
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
