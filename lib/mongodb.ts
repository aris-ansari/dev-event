// lib/mongodb.ts
import dns from "node:dns/promises";

dns.setServers(["8.8.8.8"]);

import mongoose from "mongoose";

/**
 * MongoDB connection string from environment variables.
 * Make sure MONGODB_URI is defined in your .env.local file.
 */
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

// TypeScript now knows this is a string
const MONGODB_URI: string = mongoUri;

/**
 * Interface for the cached mongoose connection.
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

/**
 * Extend the global object to store the cached connection
 * during development and hot reloads.
 */
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

/**
 * Reuse existing cache if available,
 * otherwise initialize a new one.
 */
const cached: MongooseCache = global.mongooseCache || {
  conn: null,
  promise: null,
};

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

/**
 * Connect to MongoDB using Mongoose.
 * The cached connection prevents multiple connections
 * during API route reloads in development.
 */
async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongooseInstance) => {
      console.log("MongoDB database:", mongooseInstance.connection.name);
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectDB;
