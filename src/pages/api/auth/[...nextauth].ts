import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    // ...add more providers here
    // CredentialsProvider({
    //   name: "money-keeper",
    //   credentials: {
    //     login: { type: "email" },
    //     name: { type: "string" },
    //     password: { type: "string" },
    //   },
    //   async authorize(credentials) {
    //     const response = await request.get(ApiPath.signUp)
    //   },
    // }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
}

export default NextAuth(authOptions)
