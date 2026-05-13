import mongoose, { Document, Schema } from 'mongoose';

export enum UserRole {
  SELLER = 'seller',
  BUYER = 'buyer',
  ADMIN = 'admin',
}

export interface IUser extends Document {
  phone: string;
  role: UserRole;
  fullName?: string;
  email?: string;
  isVerified: boolean;
  walletBalance: number;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    phone: { type: String, required: true, unique: true },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.BUYER },
    fullName: { type: String },
    email: { type: String },
    isVerified: { type: Boolean, default: false },
    walletBalance: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', userSchema);
