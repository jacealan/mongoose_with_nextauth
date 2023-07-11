import dbConnect from "../../../lib/mongooseConnect"
import User from "../../../models/User"

export default async function handler(req: any, res: any) {
  const {
    // query: { id },
    body: { email },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case "POST" /* Get a model by its ID */:
      try {
        const user = await User.findOne({ email: email })
        // console.log(0, user)

        if (user) {
          return res.status(200).json({ success: true, data: user })
        }
        return res.status(400).json({ success: false })
      } catch (error) {
        return res.status(400).json({ success: false })
      }

    // case "PUT" /* Edit a model by its ID */:
    //   try {
    //     const pet = await Pet.findByIdAndUpdate(id, req.body, {
    //       new: true,
    //       runValidators: true,
    //     })
    //     if (!pet) {
    //       return res.status(400).json({ success: false })
    //     }
    //     res.status(200).json({ success: true, data: pet })
    //   } catch (error) {
    //     res.status(400).json({ success: false })
    //   }
    //   break

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
