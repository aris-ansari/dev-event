// lib/mongodb.ts

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
  // Return existing connection if already connected
  if (cached.conn) {
    return cached.conn;
  }

  // Create a new connection promise if it doesn't exist
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    // Await the connection and cache it
    cached.conn = await cached.promise;
  } catch (error) {
    // Reset promise if connection fails
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectDB;
