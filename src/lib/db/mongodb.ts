import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

// Cache connection across hot reloads in development
declare global {
  // eslint-disable-next-line no-var
  var _mongooseConn: typeof mongoose | null;
  // eslint-disable-next-line no-var
  var _mongoosePromise: Promise<typeof mongoose> | null;
}

let cached = global._mongooseConn;
let cachedPromise = global._mongoosePromise;

export async function connectDB(): Promise<typeof mongoose> {
  if (cached) return cached;

  if (!cachedPromise) {
    cachedPromise = mongoose.connect(MONGODB_URI!, {
      bufferCommands: false,
    });
  }

  try {
    cached = await cachedPromise;
    global._mongooseConn = cached;
    global._mongoosePromise = cachedPromise;
  } catch (err) {
    cachedPromise = null;
    global._mongoosePromise = null;
    throw err;
  }

  return cached;
}
