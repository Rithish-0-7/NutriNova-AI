import mongoose from 'mongoose';

export async function connectMongo(uri) {
  if (!uri) {
    console.warn('MONGODB_URI not set; running without database persistence.');
    return;
  }
  try {
    await mongoose.connect(uri, { autoIndex: true, serverSelectionTimeoutMS: 5000 });
    console.info('MongoDB connected');
  } catch (error) {
    console.warn(`MongoDB connection failed: ${error.message}`);
    console.warn('Continuing API startup without database persistence.');
  }
}
