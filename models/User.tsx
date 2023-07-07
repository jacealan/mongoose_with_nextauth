import mongoose from "mongoose"
const { Schema } = mongoose

/* PetSchema will correspond to a collection in your MongoDB database. */
const UserSchema = new mongoose.Schema({
  naUsers: {
    type: Schema.Types.ObjectId,
    required: [true],
  },
  naName: {
    type: String,
    required: [true],
  },
  naEmail: {
    type: String,
    required: true,
  },
  naImage: {
    type: String,
  },
  naProvier: {
    type: String,
  },

  name: {
    /* The name of this pet */

    type: String,
    required: [true, "Please provide a name for this pet."],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  birth: {
    type: Date,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  email: {
    type: String,
  },

  roll: {
    type: String,
  },
  intraPhone: {
    type: String,
    // required: true,
  },
  workBranches: [{ type: Schema.Types.ObjectId }],
})

export default mongoose.models.User ||
  mongoose.model("User", UserSchema, "users") // schemaName, schemaObject, collectionName
