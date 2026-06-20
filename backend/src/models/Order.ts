import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  locationLat?: number;
  locationLng?: number;
  locationMapsUrl?: string;
  items: Array<{
    productId: string;
    name: string;
    quantity: number;
    price: number;
    type: 'plate' | 'kg' | 'halfKg';
  }>;
  totalAmount: number;
  paymentTransactionId: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  orderStatus: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  specialInstructions?: string;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    orderNumber: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    locationLat: { type: Number },
    locationLng: { type: Number },
    locationMapsUrl: { type: String },
    items: [
      {
        productId: String,
        name: String,
        quantity: Number,
        price: Number,
        type: { type: String, enum: ['plate', 'kg', 'halfKg'] },
      },
    ],
    totalAmount: { type: Number, required: true },
    paymentTransactionId: { type: String, required: true },
    paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'completed' },
    orderStatus: { type: String, enum: ['pending', 'preparing', 'ready', 'delivered', 'cancelled'], default: 'pending' },
    specialInstructions: String,
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>('Order', orderSchema);