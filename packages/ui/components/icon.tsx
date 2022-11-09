import cva, { VariantProps } from "../cva"
import React, { ReactElement } from "react"

const iconVariants = cva("", {
  variants: {
    size: {
      small: "w-4 h-4",
      medium: "w-6 h-6",
      large: "w-8 h-8",
    },
  },
  defaultVariants: {
    size: "medium",
  },
})

interface IconProps extends VariantProps<typeof iconVariants> {
  className?: string
}

function createIcon(
  Component: (props: { className?: string }) => ReactElement,
) {
  return function IconComponent(props: IconProps) {
    return <Component className={iconVariants(props)} />
  }
}

export default createIcon
export type { IconProps }
