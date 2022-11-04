import axios, { AxiosError, AxiosRequestConfig } from "axios"
import toast from "@lib/toast"
import { Router } from "next/router"
import StringUtils from "@lib/stringUtils"

type ReturnPromiseType<T extends (...args: any) => Promise<any>> = T extends (
  ...args: any
) => Promise<infer R>
  ? R
  : any

const handle = <F extends (...args: any[]) => any>(callback: F) => {
  return async (...args: Parameters<F>): Promise<ReturnPromiseType<F>> => {
    try {
      return callback(...args)
    } catch (error: any | AxiosError) {
      if (!axios.isAxiosError(error) || !error.response) {
        toast.getState().push({
          message: "An unexpected error occurred.",
          type: "error",
        })
        throw error
      }

      if (error.response.status === 401) {
        toast.getState().push({
          message: "You are not authorized to access this resource.",
          type: "error",
        })
        // @ts-ignore
        return await Router.push("/login")
      }

      if (error.response.status === 400 && error.response.data) {
        throw new ValidationError(error.response.data.errors || {})
      }

      if (error.response.status === 404) {
        toast.getState().push({
          message: "The resource you are looking for could not be found.",
          type: "error",
        })
      }

      if (error.response.status === 500) {
        toast.getState().push({
          message: "An unexpected error occurred.",
          type: "error",
        })
      }

      throw error
    }
  }
}

class Fetcher {
  get = <T = unknown>(url: string, config: AxiosRequestConfig) =>
    handle(axios.get<T>)(url, config)

  delete = <T = unknown>(url: string, config: AxiosRequestConfig) =>
    handle(axios.delete<T>)(url, config)

  post = <T = unknown, D = any>(url: string, config: AxiosRequestConfig<D>) =>
    handle(axios.post<T>)(url, config)

  put = <T = unknown, D = any>(url: string, config: AxiosRequestConfig<D>) =>
    handle(axios.put<T>)(url, config)
}

const fetcher = new Fetcher()

export { fetcher, ValidationError }

class ValidationError extends Error {
  errors: Record<string, string> = {}

  constructor(errors: Record<string, string[] | undefined>) {
    super("Validation Error")
    this.formatErrors(errors)
  }

  private formatErrors(errors: Record<string, string[] | undefined>) {
    this.errors = Object.keys(errors).reduce<Record<string, string>>(
      (acc, key) => {
        if (errors[key]?.[0]) {
          acc[StringUtils.toCamelCase(key)] = errors[key]![0]
        }
        return acc
      },
      {},
    )
  }
}
