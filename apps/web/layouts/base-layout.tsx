import { PropsWithChildren } from "react"
import Head from "next/head"
import { useToast, useToastMessages } from "@lib/toast"
import Space from "@mk/ui/components/space"
import Alert from "@mk/ui/components/alert"
import Toast from "@mk/ui/components/toast"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { AuthBoundary } from "@features/auth"

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Head>
        <title>MoneyKeeper</title>
      </Head>

      <AuthBoundary>
        <div className="bg-base-200">{children}</div>
      </AuthBoundary>

      <AppMessages />
    </>
  )
}

function AppMessages() {
  const messages = useToastMessages()
  const remove = useToast((s) => s.remove)

  const [list] = useAutoAnimate<HTMLDivElement>()

  return (
    <Toast vertical="bottom" horizontal="end">
      <Space as="ul" ref={list} direction="column" gap="small">
        {messages.map((toast) => (
          <li key={toast.id}>
            <Alert
              key={toast.id}
              type={toast.type}
              onClick={() => remove(toast.id)}
            >
              {toast.message}
            </Alert>
          </li>
        ))}
      </Space>
    </Toast>
  )
}
