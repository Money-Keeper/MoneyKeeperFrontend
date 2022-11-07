import "../styles/globals.css"
import { AppProps } from "next/app"
import { ReactElement, ReactNode } from "react"
import { NextPage } from "next"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Router from "next/router"
import {
  AuthSessionProvider,
  SessionProvider,
} from "features/auth/auth-context"
import { MoneyKeeperProvider } from "../features/auth/money-keeper-provider"

type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      onError: async (error: any) => {
        if (error?.response?.status === 401) {
          await Router.push("/login")
        }
      },
    },
    mutations: {
      retry: false,
    },
  },
})

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider providers={authProviders}>
        {getLayout(<Component {...pageProps} />)}
      </SessionProvider>
    </QueryClientProvider>
  )
}

const authProviders: AuthSessionProvider[] = [MoneyKeeperProvider]
