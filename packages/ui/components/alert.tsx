import cva, { VariantProps } from "../cva"
import { FC, PropsWithChildren, ReactNode } from "react"
import CheckCircle from "../icons/check-circle"
import CrossCircle from "../icons/cross-circle"
import ExclamationTriangle from "../icons/exclamation-triangle"
import InfoCircle from "../icons/info-circle"

const alertVariants = cva("alert", {
  variants: {
    type: {
      success: "alert-success",
      error: "alert-error",
      warning: "alert-warning",
      info: "alert-info",
    },
  },
})

interface AlertProps extends VariantProps<typeof alertVariants> {
  icon?: ReactNode | boolean
  onClick?: () => void
}

export default function Alert({
  type,
  icon = true,
  onClick,
  children,
}: PropsWithChildren<AlertProps>) {
  return (
    <div className={alertVariants({ type })} onClick={onClick}>
      {icon && getIcon(type)}
      {children}
    </div>
  )
}

function getIcon(type: AlertProps["type"]): ReactNode {
  switch (type) {
    case "success":
      return <CheckCircle />
    case "error":
      return <CrossCircle />
    case "warning":
      return <ExclamationTriangle />
    case "info":
      return <InfoCircle />
    default:
      return null
  }
}
