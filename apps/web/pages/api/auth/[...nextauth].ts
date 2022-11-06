import NextAuth, { Session, User as AuthUser } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { ApiPath } from "@server/path"
import { JWT } from "next-auth/jwt"
import fetcher from "@lib/fetcher"

export interface User {
  email: string
  name: string
}

const HOST_NAME =
  process.env.VERSEL_ENV === `production` ||
  process.env.VERSEL_ENV === `preview`
    ? process.env.VERCEL_URL
    : "http://localhost:3000"

export const authOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      id: "money-keeper",
      name: "money-keeper",
      credentials: { accessToken: { label: "Access Token", type: "text" } },
      // @ts-ignore
      async authorize({ accessToken } = { accessToken: "" }) {
        console.log("accessToken", accessToken, HOST_NAME)
        if (!accessToken) {
          return null
        }

        const user = await fetcher.get<User>(`${HOST_NAME}/${ApiPath.user}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })

        return {
          ...user?.data,
          accessToken,
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }: { token: JWT; user?: AuthUser }) => {
      if (user) {
        token = { accessToken: user.accessToken }
      }

      return token
    },
    session: async ({ session, token }: { session: Session; token: JWT }) => {
      session.accessToken = token.accessToken as string

      if (session.accessToken) {
        const user = await fetcher.get<User>(`${HOST_NAME}/${ApiPath.user}`, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        })
        session.user = user.data
      }

      return session
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)
