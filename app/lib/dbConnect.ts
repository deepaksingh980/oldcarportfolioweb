import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error("⚠️ Please define the MONGODB_URI environment variable in .env.local");
}

type MongooseCache = {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
};

// 👇 Extend global type safely
declare global {
  // eslint-disable-next-line no-var
  var _mongooseConnection: MongooseCache | undefined;
}

const globalWithMongoose = global as typeof globalThis & {
  _mongooseConnection?: MongooseCache;
};

// 👇 Initialize cache properly
const cached: MongooseCache = globalWithMongoose._mongooseConnection ?? {
  conn: null,
  promise: null,
};

// 👇 Assign back to global
globalWithMongoose._mongooseConnection = cached;

export async function dbConnect(): Promise<Mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = { bufferCommands: false };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      console.log("🚀 MongoDB connected successfully!");
      return mongooseInstance;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
