import { RadioGroup } from "@headlessui/react"
import { PropsWithChildren } from "react"
import cva, { VariantProps } from "../cva"
import Space from "./space"

const radioOptionVariants = cva(
  "relative border bg-primary-content cursor-pointer rounded-box p-4 ui-checked:border-primary ui-checked:border-2 ui-disabled:cursor-not-allowed ui-disabled:opacity-40",
)

const radioCardIndicatorVariants = cva(
  "absolute top-1 right-1 w-6 h-6 rounded-full border flex items-center justify-center ui-checked:border-primary",
)

interface RadioOptionCardProps {
  className?: string
}

function RadioOptionCard(props: PropsWithChildren<RadioOptionCardProps>) {
  const { children, className } = props

  return (
    <div className={radioOptionVariants({ className })}>
      <Space direction="column" gap="small" align="center">
        {children}
      </Space>

      <div className={radioCardIndicatorVariants()}>
        <div className="w-4 h-4 rounded-full ui-checked:bg-primary" />
      </div>
    </div>
  )
}

export { RadioOptionCard, RadioGroup }
