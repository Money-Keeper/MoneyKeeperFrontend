import { NextApiRequest, NextApiResponse } from "next"
import { getCookie, setCookie } from "cookies-next"

interface Options {
  req: NextApiRequest
  res: NextApiResponse
}

namespace AuthCookie {
  export function set(token: string, options: Options) {
    setCookie("money_keeper_auth", token, options)
  }

  export function get(options: Options): string | undefined {
    const cookie = getCookie("money_keeper_auth", options)
    return typeof cookie !== "boolean" ? cookie || undefined : undefined
  }

  export function setRequestHeader(req: NextApiRequest, res: NextApiResponse) {
    const token = get({ req, res })
    if (token) {
      req.headers["Authorization"] = `Bearer ${token}`
    }
  }
}

export { AuthCookie }
