import cva, { VariantProps } from "../cva"
import { PropsWithChildren } from "react"

const dividerVariants = cva("divider", {
  variants: {
    direction: {
      horizontal: "divider-vertical",
      vertical: "divider-horizontal",
    },
  },
  defaultVariants: {
    direction: "horizontal",
  },
})

interface DividerProps extends VariantProps<typeof dividerVariants> {}

export default function Divider(props: PropsWithChildren<DividerProps>) {
  return <div className={dividerVariants(props)}>{props.children}</div>
}
