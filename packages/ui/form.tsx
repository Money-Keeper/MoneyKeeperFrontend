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

interface FormProps<TSchema extends FormValues> {
  form: UseFormReturn<TSchema>
  onSubmit: (values: TSchema) => void
}

const Form = <TSchema extends FormValues>({
  form,
  onSubmit,
  children,
}: PropsWithChildren<FormProps<TSchema>>) => {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
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

  const error = errors[name]

  return (
    <div className="form-control">
      {label && (
        <label className="label" htmlFor={name}>
          <span className={clsx("label-text", error && "text-error")}>
            {label}
          </span>
        </label>
      )}

      {React.cloneElement(children, { hasError: !!error })}

      {error && <div className="text-error">{JSON.stringify(error)}</div>}
    </div>
  )
}

export { useForm, Form, FormField }
