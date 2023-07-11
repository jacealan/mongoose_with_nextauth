import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import KakaoProvider from "next-auth/providers/kakao"
import NaverProvider from "next-auth/providers/naver"

import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"
import { access } from "fs"

const kakaoCustomProvider = KakaoProvider({
  clientId: process.env.KAKAO_ID ?? "",
  clientSecret: process.env.KAKAO_SECRET ?? "",
})

kakaoCustomProvider.style = {
  logo: "https://www.kakaocorp.com/page/favicon.ico", // 필수
  logoDark: "https://www.kakaocorp.com/page/favicon.ico",
  bgDark: "#FEE500",
  bg: "#FEE500",
  text: "#191919",
  textDark: "#191919",
}

const naverCustomProvider = NaverProvider({
  clientId: process.env.NAVER_ID ?? "",
  clientSecret: process.env.NAVER_SECRET ?? "",
})

naverCustomProvider.style = {
  logo: "https://logoproject.naver.com/favicon.ico",
  logoDark: "https://logoproject.naver.com/favicon.ico",
  bgDark: "#2DB400",
  bg: "#2DB400",
  text: "#FFFFFF",
  textDark: "#FFFFFF",
}

export const authOptions: any = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
    kakaoCustomProvider,
    naverCustomProvider,
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ account, profile }: { account: any; profile: any }) {
      if (account.provider === "google") {
        return profile.email_verified // && profile.email.endsWith("@example.com")
      }
      return true // Do different verification for other providers that don't have `email_verified`
    },
    async jwt({
      token,
      user,
      account,
    }: {
      token: any
      user: any
      account: any
    }) {
      // Persist the OAuth access_token to the token right after signin

      if (account) {
        token.id_token = account.id_token
        token.userId = account.userId
      }
      return token
    },
    async session({ session, token }: { session: any; token: any }) {
      // Send properties to the client, like an access_token from a provider.
      session.id_token = token.id_token
      session.provider = "google"
      // session.userId = JSON.stringify(token._id)
      return session
    },
  },
  session: {
    strategy: "jwt",
  },
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: process.env.DATABASE_DB,
    collections: {
      Users: process.env.DATABASE_COLLECTION_NAUSERS ?? "naUsers",
      Accounts: process.env.DATABASE_COLLECTION_NAACCOUNTS ?? "naAccounts",
      Sessions: process.env.DATABASE_COLLECTION_NASESSIONS ?? "naSessions",
      VerificationTokens:
        process.env.DATABASE_COLLECTION_NAVERIFICATIONTOKENS ??
        "naVerificationTokens",
    },
  }),
}

export default NextAuth(authOptions)
