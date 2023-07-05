import { signIn, signOut, useSession } from "next-auth/react"
// import Layout from "../components/layout"

const Login = () => {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  console.log(session)
  console.log(status)

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
          </a>
        )}
      </div>
      {/* </Layout> */}
    </>
  )
}

export default Login
