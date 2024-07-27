import mongoose, { Document, Schema } from 'mongoose';

export interface IScan extends Document {
  qrCodeId: string;
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
  country: string;
  region: string;
  city: string;
  latitude: number;
  longitude: number;
  deviceType: string;
  browser: string;
}

const ScanSchema: Schema = new Schema({
  qrCodeId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  ipAddress: String,
  userAgent: String,
  country: String,
  region: String,
  city: String,
  latitude: Number,
  longitude: Number,
  deviceType: String,
  browser: String,
});

export const Scan = mongoose.model<IScan>('Scan', ScanSchema);