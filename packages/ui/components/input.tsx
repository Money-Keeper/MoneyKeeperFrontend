import { forwardRef, InputHTMLAttributes } from "react"
import cva, { VariantProps } from "../cva"

const inputVariants = cva("input input-bordered w-full", {
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

export default forwardRef<HTMLInputElement, InputProps>(function Input(
  { size, hasError, className, ...restProps },
  ref,
) {
  return (
    <input
      ref={ref}
      className={inputVariants({ size, hasError, className })}
      {...restProps}
    />
  )
})
