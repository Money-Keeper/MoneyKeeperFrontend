import cva, { VariantProps } from "../cva"
import { FC, PropsWithChildren, ReactNode } from "react"
import CheckCircle from "../icons/check-circle"
import CrossCircle from "../icons/cross-circle"
import ExclamationTriangle from "../icons/exclamation-triangle"
import InfoCircle from "../icons/info-circle"

const alertVariants = cva("alert flex items-center", {
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
      return <CheckCircle size="1.2em" />
    case "error":
      return <CrossCircle size="1.2em" />
    case "warning":
      return <ExclamationTriangle size="1.2em" />
    case "info":
      return <InfoCircle size="1.2em" />
    default:
      return null
  }
}
