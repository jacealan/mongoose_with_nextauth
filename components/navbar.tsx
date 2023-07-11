import Login from "./login"

import { Box, Flex } from "@chakra-ui/react"

export default function NavBar() {
  return (
    <>
      <Flex justifyContent={"space-between"} m={5}>
        <Box fontSize={20} fontWeight={700}>
          MongoDB(mongoose) with Next-Auth
        </Box>
        <Box>NavBar</Box>
        <Box>
          <Login />
        </Box>
      </Flex>
    </>
  )
}
