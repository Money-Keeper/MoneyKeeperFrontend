import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    accessToken: string
  }

  interface DefaultUser {
    accessToken: string
  }

  interface JWT {
    accessToken: string
  }
}
