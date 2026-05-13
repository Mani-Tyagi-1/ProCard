import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  sellerId: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  video?: string;
  deliveryCharge: number;
  category: string;
  tags: string[];
  isPublished: boolean;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    sellerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    images: { type: [String], required: true },
    video: { type: String },
    deliveryCharge: { type: Number, default: 0 },
    category: { type: String, required: true },
    tags: { type: [String], default: [] },
    isPublished: { type: Boolean, default: true },
    seoTitle: { type: String },
    seoDescription: { type: String },
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>('Product', productSchema);
