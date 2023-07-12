import { useEffect } from "react"
import { useRouter } from "next/router"
import type { NextPage } from "next"

import { signIn, signOut, useSession, getProviders } from "next-auth/react"

import { useForm, SubmitHandler } from "react-hook-form"

import { Box, Image, Stack } from "@chakra-ui/react"
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  FormHelperText,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react"

import { useEditable } from "@chakra-ui/react"

import Head from "next/head"
import Login from "@/components/login"

type SignUpData =
  | {
      email: string
      name: string
      phone: string
      intraPhone: string
      provider: string
      id_token: string
    }
  | null
  | undefined
type SignUpInputs =
  | {
      email: string
      name: string
      phone: string
      intraPhone: string
    }
  | null
  | undefined

const SignUp: NextPage = () => {
  const router = useRouter()
  const { data: session, status } = useSession()
  let sessionModified = session as typeof session & {
    provider: string
    id_token: string
  }

  // // example of react-hook-form
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm<SignUpInputs>()
  // const onSubmit: SubmitHandler<SignUpInputs> = (data) => console.log(data)

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  async function onSubmit(formData: any) {
    const values: SignUpData = formData
    // values = {...data}
    values!.provider = session?.user?.provider ?? ""
    values!.id_token = session?.user?.id_token ?? ""
    // values.provider = sessionModified?.provider
    // values.id_token = sessionModified?.id_token
    console.log(values)
    console.log(session)

    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
    console.log(response)

    if (response.status) {
      router.push("/")
    } else {
      console.log("ERROR: signup")
    }
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     alert(JSON.stringify(values, null, 2))
    //     resolve()
    //   }, 3000)
    // })
  }

  useEffect(() => {
    const authenticated = status === "authenticated"

    if (!authenticated) {
      router.push("/")
    }

    console.log(session)
  }, [status])

  // console.log(`${window.location.origin}/rest_of_path`)

  return (
    <>
      <Box m={5}>
        {/* example of react-hook-form */}
        {/* <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} />
        <input {...register("phone", { required: true })} />
        {errors.phone && <span>This field is required</span>}
        <input type="submit" />
      </form> */}

        <Stack direction={"row"} spacing={4}>
          <Image
            src={session?.user?.image ?? ""}
            alt={session?.user?.email ?? ""}
            w="96px"
            h="96px"
          />
          {/* <form onSubmit={handleSubmit(() => onSubmit(session?.user))}> */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl isInvalid={Boolean(errors.name)} isReadOnly>
                <InputGroup>
                  <InputLeftAddon>Email</InputLeftAddon>
                  <Input
                    id="email"
                    placeholder="email"
                    defaultValue={session?.user?.email ?? ""}
                    {...register("email", {
                      required: "This is required",
                      minLength: {
                        value: 4,
                        message: "Minimum length should be 4",
                      },
                    })}
                    // disabled
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.email && errors.email.message?.toString()}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={Boolean(errors.name)} isRequired>
                <InputGroup>
                  <InputLeftAddon>이름</InputLeftAddon>
                  <Input
                    id="name"
                    placeholder="이름"
                    defaultValue={session?.user?.name ?? ""}
                    {...register("name", {
                      required: "This is required",
                      minLength: {
                        value: 2,
                        message: "Minimum length should be 2",
                      },
                      maxLength: {
                        value: 20,
                        message: "Maximum length should be 20",
                      },
                    })}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.name && errors.name.message?.toString()}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={Boolean(errors.phone)} isRequired>
                <InputGroup>
                  <InputLeftAddon>핸드폰</InputLeftAddon>
                  <Input
                    id="phone"
                    placeholder="010-1234-5678"
                    {...register("phone", {
                      required: "This is required",
                      minLength: {
                        value: 13,
                        message: "Minimum length should be 13",
                      },
                      maxLength: {
                        value: 13,
                        message: "Maximum length should be 13",
                      },
                    })}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.phone && errors.phone.message?.toString()}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={Boolean(errors.intraPhone)} isRequired>
                <InputGroup>
                  <InputLeftAddon>내선번호</InputLeftAddon>
                  <Input
                    id="intraPhone"
                    placeholder="1234"
                    {...register("intraPhone", {
                      required: "내선번호가 없으면 ----를 입력해주세요",
                      minLength: {
                        value: 4,
                        message: "내선번호가 없으면 ----를 입력해주세요",
                      },
                      maxLength: {
                        value: 4,
                        message: "내선번호가 없으면 ----를 입력해주세요",
                      },
                    })}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.intraPhone && errors.intraPhone.message?.toString()}
                </FormErrorMessage>
              </FormControl>

              <Button
                // mt={4}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </Stack>
          </form>
        </Stack>
      </Box>
    </>
  )
}

export default SignUp
