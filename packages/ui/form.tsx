import z, { ZodObject } from "zod"
import React, { PropsWithChildren, ReactElement } from "react"
import clsx from "clsx"
import {
  useForm as useReactForm,
  FormProvider,
  useFormState,
} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { UseFormProps, UseFormReturn } from "react-hook-form/dist/types"
import createContext from "./context"
import Space from "./space"
import { useAutoAnimate } from "@formkit/auto-animate/react"

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

interface FormFieldProps {
  label?: string
  children: ReactElement<{ name?: string; hasError?: boolean }>
}

const FormField = ({ label, children }: PropsWithChildren<FormFieldProps>) => {
  const name = children.props.name
  const { errors } = useFormState({ name })
  const { serverErrors } = useInternalForm()

  const [containerRef] = useAutoAnimate<HTMLDivElement>()

  const error = errors[name] || serverErrors[name]

  return (
    <div ref={containerRef} className="form-control">
      {label && (
        <label className="label" htmlFor={name}>
          <span className={clsx("label-text", error && "text-error")}>
            {label}
          </span>
        </label>
      )}

      {React.cloneElement(children, { hasError: !!error })}

      {error && (
        <div className="text-error text-xs">{JSON.stringify(error)}</div>
      )}
    </div>
  )
}

export { useForm, Form, FormField }
