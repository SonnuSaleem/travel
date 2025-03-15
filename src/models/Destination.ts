import mongoose, { Schema, Document } from 'mongoose';

export interface IDestination extends Document {
  name: string;
  description: string;
  location: string;
  price: number;
  rating: number;
  imageUrl: string;
  featured: boolean;
  activities: string[];
  duration: string;
  createdAt: Date;
}

const DestinationSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  imageUrl: { type: String, required: true },
  featured: { type: Boolean, default: false },
  activities: [{ type: String }],
  duration: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Use mongoose.models to check if the model exists already to prevent overwriting
export default mongoose.models.Destination || mongoose.model<IDestination>('Destination', DestinationSchema); 