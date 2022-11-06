import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { toCamelCase, isDev } from "./utils"

interface Notificator {
  push: (notification: {
    message: string
    type: "success" | "error" | "info" | "warning"
  }) => void
}

interface FetcherOptions {
  notificator?: Notificator
}

class Fetcher {
  constructor(private readonly options: FetcherOptions = {}) {}

  get = <T = unknown>(url: string, config: AxiosRequestConfig) =>
    handle(this.options.notificator, axios.get<T>)(url, config)

  delete = <T = unknown>(url: string, config: AxiosRequestConfig) =>
    handle(this.options.notificator, axios.delete<T>)(url, config)

  post = <T = unknown, D = any>(url: string, config: AxiosRequestConfig<D>) =>
    handle(this.options.notificator, axios.post<T>)(url, config.data, config)

  put = <T = unknown, D = any>(url: string, config: AxiosRequestConfig<D>) =>
    handle(this.options.notificator, axios.put<T>)(url, config.data, config)
}

type ReturnPromiseType<T extends (...args: any) => Promise<any>> = T extends (
  ...args: any
) => Promise<infer R>
  ? R
  : any

const handle = <F extends (...args: any[]) => any>(
  notificator: Notificator | undefined,
  callback: F,
) => {
  return async (...args: Parameters<F>): Promise<ReturnPromiseType<F>> => {
    try {
      return await callback(...args)
    } catch (error: any | AxiosError) {
      return catchError(error, notificator)
    }
  }
}

const catchError = (error: any | AxiosError, notificator?: Notificator) => {
  if (!axios.isAxiosError(error) || !error.response) {
    notificator?.push({
      message: isDev() ? error.message : "An unexpected error occurred.",
      type: "error",
    })
    throw error
  }

  if (error.response.status === 401) {
    notificator?.push({
      message: "You are not authorized to access this resource.",
      type: "error",
    })
  }

  if (error.response.status === 400 && error.response.data) {
    throw new ValidationError(error.response.data.errors || {})
  }

  if (error.response.status === 404) {
    notificator?.push({
      message: isDev()
        ? error.message
        : "The resource you are looking for could not be found.",
      type: "error",
    })
  }

  if (error.response.status === 500) {
    notificator?.push({
      message: isDev() ? error.message : "An unexpected error occurred.",
      type: "error",
    })
  }

  throw error
}

export default Fetcher

export class ValidationError extends Error {
  errors: Record<string, string> = {}

  constructor(errors: Record<string, string[] | string | undefined>) {
    super("Validation Error")
    this.formatErrors(errors)
  }

  private formatErrors(errors: Record<string, string[] | string | undefined>) {
    this.errors = Object.keys(errors).reduce<Record<string, string>>(
      (acc, key) => {
        if (!errors[key]) return acc

        const realKey = toCamelCase(key)

        if (Array.isArray(errors[key])) {
          acc[realKey] = errors[key]![0]
        }

        if (typeof errors[key] === "string") {
          acc[realKey] = errors[key] as string
        }

        return acc
      },
      {},
    )
  }
}
