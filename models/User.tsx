import mongoose from "mongoose"
const { Schema } = mongoose
import naUser from "./naUser"

const UserSchema = new mongoose.Schema(
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
    phone: {
      type: String,
    },
    intraPhone: {
      type: String,
    },
    provider: {
      type: String,
      required: true,
    },
    id_token: {
      type: String,
      required: true,
    },
    naUser: { type: Schema.Types.ObjectId, ref: "naUser", required: true },
  },
  { versionKey: false, timestamps: true }
)

export default mongoose.models.User ||
  mongoose.model("User", UserSchema, "users") // schemaName, schemaObject, collectionName
