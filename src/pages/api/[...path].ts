import { NextApiRequest, NextApiResponse } from "next"
import { proxy } from "../../server/proxy"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise(async (resolve, reject) => {
    proxy.once("error", reject)

    proxy.web(req, res)
  })
}

export const config = {
  api: {
    bodyParser: false,
  },
}
