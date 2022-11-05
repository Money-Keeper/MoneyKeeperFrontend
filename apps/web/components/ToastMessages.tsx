import { useToastMessages, useToast } from "@lib/toast"
import Toast from "@mk/ui/components/toast"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import Space from "@mk/ui/components/space"
import Alert from "@mk/ui/components/alert"

export default function ToastMessages() {
  const [list] = useAutoAnimate<HTMLDivElement>()

  const toasts = useToastMessages()
  const remove = useToast((s) => s.remove)

  return (
    <Toast vertical="bottom" horizontal="end">
      <Space as="ul" ref={list} direction="column" gap="small">
        {toasts.map((toast) => (
          <Alert
            key={toast.id}
            type={toast.type}
            onClick={() => remove(toast.id)}
          >
            {toast.message}
          </Alert>
        ))}
      </Space>
    </Toast>
  )
}
