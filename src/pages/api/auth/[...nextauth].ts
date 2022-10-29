import NextAuth, { Session, User as AuthUser } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { fetcher, InternalApiPath } from "../../../lib/fetcher"
import { JWT } from "next-auth/jwt"

export interface User {
  email: string
  name: string
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "money-keeper",
      name: "money-keeper",
      credentials: { accessToken: { label: "Access Token", type: "text" } },
      // @ts-ignore
      async authorize(credentials = {}) {
        const user = await fetcher.post<User>(InternalApiPath.currentUser, {
          token: credentials.accessToken,
        })

        if (user.data) {
          return {
            ...user.data,
            accessToken: credentials.accessToken,
          }
        } else {
          return null
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }: { token: JWT; user?: AuthUser }) => {
      console.log(user)
      if (user) {
        token = { accessToken: user.accessToken }
      }

      return token
    },
    session: ({ session, token }: { session: Session; token: JWT }) => {
      session.accessToken = token.accessToken as string

      return session
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)
