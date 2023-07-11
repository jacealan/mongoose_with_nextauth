import "@/styles/globals.css"
import type { AppProps } from "next/app"

import { SessionProvider } from "next-auth/react"
import { ChakraProvider } from "@chakra-ui/react"
import Layout from "@/components/layout"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <ChakraProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </SessionProvider>
    </>
  )
}
