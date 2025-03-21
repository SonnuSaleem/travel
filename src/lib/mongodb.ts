import { MongoClient } from 'mongodb';

const uri = process.env.DATABASE_URL || '';
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Validate MongoDB URI format
const isValidMongoDBURI = (uri: string): boolean => {
  return uri.startsWith('mongodb://') || uri.startsWith('mongodb+srv://');
};

if (!process.env.DATABASE_URL) {
  console.warn('MongoDB URI not found in environment variables');
} else if (!isValidMongoDBURI(process.env.DATABASE_URL)) {
  console.warn('Invalid MongoDB URI format. URI should start with mongodb:// or mongodb+srv://');
}

// Only attempt to connect if we have a valid URI
if (process.env.DATABASE_URL && isValidMongoDBURI(process.env.DATABASE_URL)) {
  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    const globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(uri, options);
      globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
  } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export async function connectToDatabase() {
  try {
    if (!process.env.DATABASE_URL || !isValidMongoDBURI(process.env.DATABASE_URL)) {
      throw new Error('Invalid MongoDB connection string. Please check your DATABASE_URL environment variable.');
    }
    
    if (!clientPromise) {
      throw new Error('MongoDB client not initialized. Please check your DATABASE_URL environment variable.');
    }
    
    const client = await clientPromise;
    const db = client.db('travel_agency');
    return db;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error; // Rethrow to allow calling code to handle the error
  }
}

// Add default export for backward compatibility
export default connectToDatabase; 