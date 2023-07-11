import mongoose from "mongoose"
const { Schema } = mongoose

/* PetSchema will correspond to a collection in your MongoDB database. */
const UserSchema = new mongoose.Schema(
  {
    // naUsers: {
    //   type: Schema.Types.ObjectId,
    //   required: [true],
    // },
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
    },
    id_token: {
      type: String,
    },

    // workBranches: [{ type: Schema.Types.ObjectId }],
  },
  { versionKey: false, timestamps: true }
)

export default mongoose.models.User ||
  mongoose.model("User", UserSchema, "users") // schemaName, schemaObject, collectionName
