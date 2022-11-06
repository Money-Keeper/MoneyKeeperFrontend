import cva, { VariantProps } from "../cva"
import { ButtonHTMLAttributes, ElementType } from "react"

const buttonVariants = cva("btn", {
  variants: {
    intend: {
      primary: "btn-primary",
      secondary: "btn-secondary",
      accent: "btn-accent",
      success: "btn-success",
      error: "btn-error",
      ghost: "btn-ghost",
      link: "btn-link",
    },
    size: {
      small: "btn-sm",
      medium: "btn-md",
      large: "btn-lg",
    },
    fullWidth: {
      true: "w-full",
    },
    loading: {
      true: "loading",
    },
    outline: {
      true: "btn-outline",
    },
    shape: {
      circle: "btn-circle",
      square: "btn-square",
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
    ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  as?: ElementType
}

export default function Button({
  intend,
  size,
  fullWidth,
  className,
  shape,
  outline,
  loading,
  as,
  ...restProps
}: ButtonProps) {
  const Component = as ?? "button"

  return (
    <Component
      className={buttonVariants({
        intend,
        size,
        fullWidth,
        shape,
        outline,
        loading,
        className,
      })}
      {...restProps}
    >
      {restProps.children}
    </Component>
  )
}
