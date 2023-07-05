import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import KakaoProvider from "next-auth/providers/kakao"
import NaverProvider from "next-auth/providers/naver"

import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"

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
  },
  session: {
    strategy: "jwt",
  },
  adapter: MongoDBAdapter(clientPromise, {
    collections: {
      Users: process.env.DATABASE_COLLECTION_NAUSERS ?? "Users",
      Accounts: process.env.DATABASE_COLLECTION_NAACCOUNTS ?? "Accounts",
      Sessions: process.env.DATABASE_COLLECTION_NASESSIONS ?? "Sessions",
      VerificationTokens:
        process.env.DATABASE_COLLECTION_NAVERIFICATIONTOKENS ??
        "VerificationTokens",
    },
    databaseName: process.env.DATABASE_DB,
  }),
}

export default NextAuth(authOptions)
