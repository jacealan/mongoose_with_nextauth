import mongoose from "mongoose"
const { Schema } = mongoose

const naUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this pet."],
      maxlength: [60, "Name cannot be more than 60 characters"],
    },
    email: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    emailVerified: {
      type: Boolean,
    },
  },
  { versionKey: false, timestamps: true }
)

export default mongoose.models.naUser ||
  mongoose.model("naUser", naUserSchema, "naUsers") // schemaName, schemaObject, collectionName
