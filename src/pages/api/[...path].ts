import { NextApiRequest, NextApiResponse } from "next"
import { proxy } from "../../server/proxy"
import { AuthCookie } from "../../server/cookies"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise(async (resolve, reject) => {
    AuthCookie.setRequestHeader(req, res)

    proxy.once("error", reject)

    proxy.web(req, res)
  })
}

export const config = {
  api: {
    bodyParser: false,
  },
}
