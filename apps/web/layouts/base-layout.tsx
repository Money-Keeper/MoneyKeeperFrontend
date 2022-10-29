import { PropsWithChildren } from "react"
import Head from "next/head"

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Head>
        <title>MoneyKeeper</title>
      </Head>

      <div className="bg-base-200">{children}</div>
    </>
  )
}
