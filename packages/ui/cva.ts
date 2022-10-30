import { cva as cvaBase, VariantProps } from "class-variance-authority"

type StringToBoolean<T> = T extends "true" | "false" ? boolean : T
type ClassValue = string | null | undefined | ClassValue[]

interface ClassProp {
  class?: ClassValue
}

interface ClassNameProp {
  className?: string
}

type ConfigSchema = Record<string, Record<string, ClassValue>>
type ConfigVariants<T extends ConfigSchema> = {
  [Variant in keyof T]?: StringToBoolean<keyof T[Variant]> | null
}
type Config<T> = T extends ConfigSchema
  ? {
      variants?: T
      defaultVariants?: ConfigVariants<T>
      compoundVariants?: (T extends ConfigSchema
        ? ConfigVariants<T> & ClassProp
        : ClassProp)[]
    }
  : never

type Props<T> = T extends ConfigSchema
  ? ConfigVariants<T> & ClassProp & ClassNameProp
  : ClassProp & ClassNameProp

function cva<T extends ConfigSchema>(
  base?: ClassValue,
  config?: Config<T> | undefined,
): (props?: Props<T> | undefined) => string {
  return (props?: Props<T> | undefined) => {
    const parsedProps = getVariantProps(props || {}, config?.variants || {})
    const p = {
      class: props?.className,
      ...parsedProps,
    } as Props<T>

    return cvaBase(base, config)(p)
  }
}

export default cva
export type { VariantProps, ClassProp, ClassNameProp }

function getVariantProps<
  TVariant extends (...args: any) => any,
  TProps extends VariantProps<TVariant>,
>(props: TProps, schema: ConfigSchema) {
  return Object.keys(schema).reduce<Record<string, any>>((acc, key) => {
    if (key in props) {
      // @ts-ignore
      acc[key] = props[key]
    }
    return acc
  }, {}) as VariantProps<TVariant>
}
