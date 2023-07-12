import { useEffect } from "react"
import { useRouter } from "next/router"
import { useEditable } from "@chakra-ui/react"
import { signIn, signOut, useSession } from "next-auth/react"
// import Layout from "../components/layout"

import dbConnect from "../lib/mongooseConnect"
import User from "../models/User"

import NextAuth, { DefaultSession } from "next-auth"

const Login = () => {
  const router = useRouter()

  const { data: session, status } = useSession()
  const loading = status === "loading"
  // let sessionModified = session as typeof session & {
  //   id_token: string
  // }

  const isUser = async () => {
    console.log(session)
    console.log(session?.user)
    console.log(status)
    // console.log(sessionModified)

    try {
      const response = await fetch("/api/user/ismember", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: session?.user?.email }),
      })
      const responseData = await response.json()
      // console.log(response)
      // console.log(await responseData)

      if (responseData.success) {
        const response = await fetch("/api/user", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: session?.user?.email,
            id_token: session?.user?.id_token,
            // id_token: sessionModified?.id_token,
          }),
        })
        // console.log(response)
        router.push("/")
      } else {
        router.push("/user/signup")
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  useEffect(() => {
    const authenticated = status === "authenticated"

    if (authenticated) {
      isUser()
    } else {
      router.push("/")
    }
  }, [status])

  return (
    <>
      {/* <Layout headerOption={{ title: "로그인" }}> */}
      <div>
        {!session && (
          <a
            href={"/api/auth/signin"}
            onClick={(e) => {
              e.preventDefault()
              // signIn("google")
              signIn()
            }}
          >
            {status} | <b>Sign in</b>
          </a>
        )}
      </div>
      <div>
        {session?.user && (
          <a
            href={"/api/auth/signout"}
            onClick={(e) => {
              e.preventDefault()
              signOut()
            }}
          >
            {status} by {session?.user.email} | <b>Sign out</b>
          </a>
        )}
      </div>
      {/* </Layout> */}
    </>
  )
}

export default Login
