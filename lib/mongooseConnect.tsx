import mongoose from "mongoose"

const MONGODB_URI = process.env.DATABASE_URI
// const MONGODB_URI = `${process.env.DATABASE_URI}:27017/${process.env.DATABASE_DB}`
const MONGODB_DB = process.env.DATABASE_DB

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let globalWithMongo = global as typeof globalThis & {
  mongoose: any
}
let cached = globalWithMongo.mongoose
// const opts = {
//   bufferCommands: false,
//   dbName: MONGODB_DB,
// }

if (!cached) {
  cached = globalWithMongo.mongoose = { conn: null, promise: null }
}
// cached.promise = mongoose.connect(MONGODB_URI ?? "", opts).then((mongoose) => {
//   return mongoose
// })

async function dbConnect() {
  // console.log(cached.conn)
  if (cached.conn) {
    // console.log("conn")
    return cached.conn
  }

  if (!cached.promise) {
    // console.log("no promise")
    const opts = {
      bufferCommands: false,
      dbName: MONGODB_DB,
    }

    cached.promise = mongoose
      .connect(MONGODB_URI ?? "", opts)
      .then((mongoose) => {
        return mongoose
      })
  }
  // console.log("try")

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default dbConnect
