import { InputHTMLAttributes } from "react"
import cva, { VariantProps } from "../cva"

const inputVariants = cva("input input-bordered w-full max-w-xs", {
  variants: {
    size: {
      small: "input-sm",
      medium: "input-md",
      large: "input-lg",
    },
    hasError: {
      true: "input-error",
    },
  },
  defaultVariants: {
    size: "medium",
  },
})

interface InputProps
  extends VariantProps<typeof inputVariants>,
    Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {}

export default function Input({
  size,
  hasError,
  className,
  ...restProps
}: InputProps) {
  return (
    <input
      className={inputVariants({ size, hasError, className })}
      {...restProps}
    />
  )
}
