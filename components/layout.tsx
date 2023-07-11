import { Box, Center } from "@chakra-ui/react"
import NavBar from "./navbar"

export default function Layout({ children }: { children: any }) {
  return (
    <Center w="100%">
      <Box w={"1080px"}>
        <NavBar />
        <hr />
        <>{children}</>
      </Box>
    </Center>
  )
}
