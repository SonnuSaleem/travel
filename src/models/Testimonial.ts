import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  customerName: string;
  customerImage?: string;
  rating: number;
  comment: string;
  destination: string;
  date: Date;
}

const TestimonialSchema: Schema = new Schema({
  customerName: { type: String, required: true },
  customerImage: { type: String },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  destination: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

export default mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema); 