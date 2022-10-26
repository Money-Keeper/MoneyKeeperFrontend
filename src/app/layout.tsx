import "../styles/globals.css"
import { PropsWithChildren } from "react"

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <title>MoneyKeeper</title>
      </head>

      <body className="bg-sky-300">{children}</body>
    </html>
  )
}
