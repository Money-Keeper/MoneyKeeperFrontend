import { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"
import { ApiPath, fetcher } from "../../../lib/fetcher"
import { AuthCookie } from "../../../server/cookies"
import { UserModel } from "../../../server/models/user"

const requestSchema = z.object({
  login: z.string().email().min(8).max(64),
  password: z.string().min(8).max(60),
})

const loginResponseSchema = z.object({
  token: z.string(),
  userId: z.string(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const credentials = requestSchema.parse(req.body)
    const loginResponse = await fetcher.post(ApiPath.login, credentials)

    const data = loginResponseSchema.parse(loginResponse.data)
    AuthCookie.set(data.token, { res, req })

    return res.status(200).json(UserModel.get(req, res))
  } catch (e) {
    if (e instanceof z.ZodError) {
      return res.status(400).send({
        message: `Bad payload!`,
      })
    } else {
      console.log(e)
      // @ts-ignore
      return res.status(e.status || 500).send(e.message)
    }
  }
}