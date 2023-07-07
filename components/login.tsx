import { useEffect } from "react"
import { useRouter } from "next/router"
import { useEditable } from "@chakra-ui/react"
import { signIn, signOut, useSession } from "next-auth/react"
// import Layout from "../components/layout"

import dbConnect from "../lib/mongooseConnect"
import User from "../models/User"

const Login = () => {
  const router = useRouter()

  const { data: session, status } = useSession()
  const loading = status === "loading"

  const isUser = async () => {
    console.log(session)
    console.log(session?.user)
    console.log(session?.account)
    console.log(status)
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: session?.user?.email }),
      })

      console.log(response)
      router.push("/user/signup")
    } catch (error) {
      console.error("Error:", error)
    }
  }

  useEffect(() => {
    const authenticated = status === "authenticated"

    if (authenticated) {
      isUser()
    }
  }, [status])

  return (
    <>
      {/* <Layout headerOption={{ title: "로그인" }}> */}
      <div>
        {!session && (
          <ul>
            <li>
              <a
                href={"/api/auth/signin"}
                onClick={(e) => {
                  e.preventDefault()
                  // signIn("google")
                  signIn()
                }}
              >
                Google Sign in
                <br />
                {status} by {session?.user.email}
              </a>
            </li>
          </ul>
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
            Sign out
            <br />
            {status} by {session?.user.email}
            {session?.account?.provider}
          </a>
        )}
      </div>
      {/* </Layout> */}
    </>
  )
}

export default Login
