import cva, { VariantProps } from "../cva"
import { ElementType, forwardRef, HTMLAttributes } from "react"

const spaceVariants = cva("flex", {
  variants: {
    direction: {
      row: "flex-row items-center",
      column: "flex-col",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      spaceBetween: "justify-between",
      spaceAround: "justify-around",
    },
    gap: {
      xxSmall: "gap-1",
      xSmall: "gap-2",
      small: "gap-3",
      medium: "gap-4",
      large: "gap-6",
      xLarge: "gap-8",
      xxLarge: "gap-10",
    },
    wrap: {
      true: "flex-wrap",
    },
  },
  defaultVariants: {
    direction: "row",
    align: "center",
  },
})

interface SpaceProps
  extends VariantProps<typeof spaceVariants>,
    HTMLAttributes<HTMLDivElement> {
  as?: ElementType
}

export default forwardRef<HTMLDivElement, SpaceProps>(function Space(
  { direction, align, justify, gap, wrap, className, ...restProps }: SpaceProps,
  ref,
) {
  return (
    <div
      className={spaceVariants({
        direction,
        align,
        justify,
        gap,
        wrap,
        className,
      })}
      ref={ref}
      {...restProps}
    >
      {restProps.children}
    </div>
  )
})
