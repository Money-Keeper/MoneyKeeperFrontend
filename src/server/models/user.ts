import { z } from "zod"
import { ApiPath, fetcher } from "../../lib/fetcher"
import { AuthCookie } from "../cookies"
import { NextApiRequest, NextApiResponse } from "next"

interface User {
  id: string
  login: string
  name: string
}

const userSchema = z.object({
  id: z.string(),
  login: z.string(),
  name: z.string(),
})

namespace UserModel {
  export async function get(req: NextApiRequest, res: NextApiResponse) {
    const userResponse = await fetcher.get<User[]>(ApiPath.user, {
      headers: {
        Authorization: `Bearer ${AuthCookie.get({ req, res })}`,
      },
    })
    return userSchema.parse(userResponse.data[0])
  }
}

export { UserModel }
