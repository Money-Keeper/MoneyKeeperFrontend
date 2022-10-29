import { ReactNode } from "react"
import { useSession } from "next-auth/react"
import Head from "next/head"
import DashboardLayout from "@layouts/dashboard-layout"

export default function DashboardPage() {
  return (
    <div className="align-center mt-5 flex">
      <h1 className="text-5xl font-bold">I am dashboard</h1>
      <DashboardCard />
    </div>
  )
}

function DashboardCard() {
  const session = useSession()

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">{JSON.stringify(session)}</h2>
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
