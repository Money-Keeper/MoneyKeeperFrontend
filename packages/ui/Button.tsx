import { cva, VariantProps } from "cva"
import clsx from "clsx"
import { ButtonHTMLAttributes, HTMLAttributes, PropsWithChildren } from "react"

const buttonVariants = cva(clsx("flex items-center", ["btn"]), {
  variants: {
    intend: {
      primary: clsx("btn-primary"),
      secondary: clsx("btn-secondary"),
      danger: clsx("btn-danger"),
    },
    size: {
      small: clsx("px-2 py-1 text-sm"),
      medium: clsx("px-3 py-2 text-base"),
      large: clsx("px-4 py-3 text-lg"),
    },
    fullWidth: {
      true: clsx("w-full"),
    },
  },
  defaultVariants: {
    intend: "primary",
    size: "medium",
    fullWidth: false,
  },
})

interface ButtonProps
  extends VariantProps<typeof buttonVariants>,
    ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({
  intend,
  size,
  fullWidth,
  className,
  ...restProps
}: ButtonProps) {
  return (
    <button
      className={buttonVariants({ intend, size, fullWidth, class: className })}
      {...restProps}
    >
      {restProps.children}
    </button>
  )
}
