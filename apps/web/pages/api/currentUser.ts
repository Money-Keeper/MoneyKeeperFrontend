import { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"
import { ApiPath, fetcher } from "../../lib/fetcher"

const userSchema = z.object({
  login: z.string(),
  name: z.string(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const token: string | undefined = req.body.token

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    const userResponse = await fetcher.get(ApiPath.user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const parsedUser = userSchema.parse(userResponse.data[0])
    return res.status(200).json({ ...parsedUser, email: parsedUser.login })
  } catch (e) {
    if (e instanceof z.ZodError) {
      return res.status(400).send({
        message: e.message,
      })
    } else {
      throw e
    }
  }
}
