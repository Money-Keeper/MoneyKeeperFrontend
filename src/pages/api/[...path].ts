import { NextApiRequest, NextApiResponse } from "next"
import { proxy } from "../../server/proxy"
import { unstable_getServerSession } from "next-auth"
import { authOptions } from "./auth/[...nextauth]"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise(async (resolve, reject) => {
    const session = await unstable_getServerSession(req, res, authOptions)
    const authorization = session?.token

    if (authorization) {
      req.headers["Authorization"] = `Bearer ${authorization}`
    }

    proxy.once("error", reject)

    proxy.web(req, res)
  })
}

export const config = {
  api: {
    bodyParser: false,
  },
}
