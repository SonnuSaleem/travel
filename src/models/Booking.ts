import mongoose, { Schema, Document } from 'mongoose';
import { IDestination } from './Destination';

export interface IBooking extends Document {
  destination: IDestination['_id'];
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  travelDate: Date;
  numberOfTravelers: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  specialRequests?: string;
  createdAt: Date;
}

const BookingSchema: Schema = new Schema({
  destination: { type: Schema.Types.ObjectId, ref: 'Destination', required: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String, required: true },
  travelDate: { type: Date, required: true },
  numberOfTravelers: { type: Number, required: true, min: 1 },
  totalPrice: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled'], 
    default: 'pending' 
  },
  specialRequests: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema); 