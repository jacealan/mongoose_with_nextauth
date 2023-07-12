import { userAgent } from "next/server"
import dbConnect from "../../../lib/mongooseConnect"
import User from "../../../models/User"
import naUser from "../../../models/naUser"

export default async function handler(req: any, res: any) {
  const {
    // query: { id },
    body: { email, name, phone, intraPhone, provider, id_token },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case "POST" /* SIGNUP */:
      try {
        // console.log(email, name, phone, intraPhone, provider)
        const isMember = await User.findOne({ email: email })
        // console.log(isMember._id.toString())
        if (isMember) {
          console.log(`there is ${email}`)
          return res.status(400).json({ success: false })
        }

        const nauser = await naUser.findOne({ email: email })
        console.log(nauser)
        let user = new User({
          email,
          name,
          phone,
          intraPhone,
          provider,
          id_token,
          naUser: nauser._id,
        })
        user.save().then(() => console.log(`Saved ${email} `))

        if (user) {
          return res.status(200).json({ success: true, data: user })
        }
        return res.status(400).json({ success: false })
      } catch (error) {
        return res.status(400).json({ success: false })
      }

    case "PUT" /* Edit a model by its ID */:
      console.log(email, id_token)
      try {
        const user = await User.findOne({ email: email })
        user.id_token = id_token
        console.log(user)
        await user.save()
        res.status(200).json({ success: true, data: user })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    // case "DELETE" /* Delete a model by its ID */:
    //   try {
    //     const deletedPet = await Pet.deleteOne({ _id: id })
    //     if (!deletedPet) {
    //       return res.status(400).json({ success: false })
    //     }
    //     res.status(200).json({ success: true, data: {} })
    //   } catch (error) {
    //     res.status(400).json({ success: false })
    //   }
    //   break

    default:
      return res.status(400).json({ success: false })
  }
}
