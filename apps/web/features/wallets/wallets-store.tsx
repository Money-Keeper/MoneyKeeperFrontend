import { ApiPath } from "@server/path"
import { useSession } from "../auth"
import { useQuery } from "@tanstack/react-query"
import fetcher from "@lib/fetcher"
import { PropsWithChildren, useLayoutEffect } from "react"
import { useRouter } from "next/router"

interface Wallet {
  id: string
  name: string
  type?: string
}

export enum WalletType {
  Card = "card",
  Cash = "cash",
  Crypto = "crypto",
  Bank = "bank",
  Investment = "investment",
}

async function fetchWallets() {
  return await fetcher.get<Wallet[]>(ApiPath.wallets)
}

function useWallets() {
  const { isAuthenticated } = useSession()
  const { data, isLoading } = useQuery(["wallets"], fetchWallets, {
    enabled: isAuthenticated,
  })

  const wallets = data?.data || []
  const hasWallets = !isLoading && wallets.length > 0

  return { wallets, loading: isLoading, hasWallets }
}

const WalletsGuard = ({ children }: PropsWithChildren) => {
  const { hasWallets } = useWallets()
  const router = useRouter()

  useLayoutEffect(() => {
    if (!hasWallets) {
      router.push("/new-wallet")
    }
  }, [hasWallets, router])

  return <>{hasWallets ? children : null}</>
}

export { useWallets, WalletsGuard }
