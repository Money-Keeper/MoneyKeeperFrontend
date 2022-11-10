import z, { ZodObject } from "zod"
import React, { PropsWithChildren, ReactElement, useMemo } from "react"
import {
  useForm as useReactForm,
  FormProvider,
  useFormState,
} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { UseFormProps, UseFormReturn } from "react-hook-form/dist/types"
import createContext from "../context"
import Space from "./space"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import cva, { VariantProps } from "../cva"

type FormValues = Record<string, any>

const useForm = <TFormValues extends FormValues>(
  options: UseFormProps<TFormValues> & { schema: ZodObject<TFormValues> },
) => {
  const { schema, ...rest } = options

  return useReactForm<z.infer<typeof schema>>({
    ...rest,
    resolver: zodResolver(schema),
  })
}

type ServerErrors = Record<string, string>

interface FormProps<TSchema extends FormValues> {
  form: UseFormReturn<TSchema>
  onSubmit: (values: TSchema) => void
  serverErrors?: ServerErrors
}

const [InternalFormProvider, useInternalForm] = createContext<{
  serverErrors: ServerErrors
}>("InternalFormContext")

const Form = <TSchema extends FormValues>({
  form,
  onSubmit,
  serverErrors = {},
  children,
}: PropsWithChildren<FormProps<TSchema>>) => {
  return (
    <FormProvider {...form}>
      <InternalFormProvider serverErrors={serverErrors}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Space direction="column" gap="medium">
            {children}
          </Space>
        </form>
      </InternalFormProvider>
    </FormProvider>
  )
}

const formFieldVariants = cva("", {})

interface FormFieldProps {
  className?: string
  children:
    | ReactElement<{ hasError?: boolean; name?: string }>[]
    | ReactElement<{ hasError?: boolean; name?: string }>
}

const FormField = ({ className, children }: FormFieldProps) => {
  const name = useMemo(() => {
    const element = React.Children.toArray(children)
      .filter(React.isValidElement)
      .find((el) => React.isValidElement(el) && (el.props as any).name)

    return ((element?.props as any)?.name as string) || ""
  }, [children])

  const { errors } = useFormState({ name })
  const { serverErrors } = useInternalForm()

  const [containerRef] = useAutoAnimate<HTMLDivElement>()

  const error = errors[name] || serverErrors[name]

  return (
    <div ref={containerRef} className={formFieldVariants({ className })}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { hasError: !!error, name })
        }
        return child
      })}

      {error && (
        <div className="text-error text-xs mt-1">
          {typeof error === "string"
            ? error
            : typeof error.message === "string"
            ? error.message
            : ""}
        </div>
      )}
    </div>
  )
}

const formFieldLabelVariants = cva("label", {
  variants: {
    hasError: {
      true: "text-error",
    },
  },
})

interface FormFieldLabelProps
  extends VariantProps<typeof formFieldLabelVariants> {
  name?: string
  className?: string
}

function FormFieldLabel({
  name,
  hasError,
  className,
  children,
}: PropsWithChildren<FormFieldLabelProps>) {
  return (
    <label
      className={formFieldLabelVariants({ hasError, className })}
      htmlFor={name}
    >
      {children}
    </label>
  )
}

FormField.Label = FormFieldLabel

export { useForm, Form, FormField }
