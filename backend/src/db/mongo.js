import mongoose from 'mongoose';

let isConnected = false;

/**
 * Singleton Pattern:
 * - ensure only one DB connection is created
 */
export async function connectMongo(uri) {
  if (!uri) throw new Error('MONGODB_URI is missing');

  if (isConnected) return mongoose.connection;

  mongoose.set('strictQuery', true);
  await mongoose.connect(uri);
  isConnected = true;

  console.log('✅ MongoDB connected');
  return mongoose.connection;
}
