import mongoose, { Schema, Document } from 'mongoose';

export interface ISettings extends Document {
  deliveryFee: number;
  updatedAt: Date;
}

const settingsSchema = new Schema<ISettings>(
  {
    deliveryFee: { type: Number, required: true, default: 30 },
  },
  { timestamps: true }
);

// Singleton pattern — only ever one settings document.
// If none exists, getSettings() will create it with defaults.
export default mongoose.model<ISettings>('Settings', settingsSchema);