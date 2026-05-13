import mongoose, { Document, Schema } from 'mongoose';

export enum OrderStatus {
  PENDING = 'Pending',
  PAID = 'Paid',
  PROCESSING = 'Processing',
  SHIPPED = 'Shipped',
  DELIVERED = 'Delivered',
  CANCELLED = 'Cancelled',
  REFUNDED = 'Refunded',
}

export interface IOrder extends Document {
  productId: mongoose.Types.ObjectId;
  sellerId: mongoose.Types.ObjectId;
  buyerId?: mongoose.Types.ObjectId; // Optional if buyer is a guest/silent profile
  
  buyerDetails: {
    fullName: string;
    phone: string;
    email?: string;
    address: string;
    pincode: string;
  };
  
  amount: number;
  deliveryCharge: number;
  totalAmount: number;
  
  status: OrderStatus;
  
  paymentDetails: {
    razorpayOrderId?: string;
    razorpayPaymentId?: string;
    razorpaySignature?: string;
    isVerified: boolean;
  };
  
  shippingDetails: {
    courierName?: string;
    trackingId?: string;
  };

  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    sellerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    buyerId: { type: Schema.Types.ObjectId, ref: 'User' },
    
    buyerDetails: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String },
      address: { type: String, required: true },
      pincode: { type: String, required: true },
    },
    
    amount: { type: Number, required: true },
    deliveryCharge: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    
    status: { type: String, enum: Object.values(OrderStatus), default: OrderStatus.PENDING },
    
    paymentDetails: {
      razorpayOrderId: { type: String },
      razorpayPaymentId: { type: String },
      razorpaySignature: { type: String },
      isVerified: { type: Boolean, default: false },
    },
    
    shippingDetails: {
      courierName: { type: String },
      trackingId: { type: String },
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model<IOrder>('Order', orderSchema);
