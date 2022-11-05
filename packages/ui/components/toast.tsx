import cva, { VariantProps } from "../cva"
import { PropsWithChildren } from "react"

const toastVariants = cva("toast", {
  variants: {
    horizontal: {
      start: "toast-start",
      center: "toast-center",
      end: "toast-end",
    },
    vertical: {
      top: "toast-top",
      center: "toast-middle",
      bottom: "toast-bottom",
    },
  },
  defaultVariants: {
    horizontal: "center",
    vertical: "bottom",
  },
})

interface ToastProps extends VariantProps<typeof toastVariants> {}

export default function Toast({
  horizontal,
  vertical,
  className,
  children,
}: PropsWithChildren<ToastProps>) {
  return (
    <div className={toastVariants({ horizontal, vertical, className })}>
      {children}
    </div>
  )
}
