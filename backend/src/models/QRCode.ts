import mongoose, { Document, Schema } from 'mongoose';

export interface IQRCode extends Document {
  id: string;
  text: string;
  shape: 'square' | 'rounded';
  fgColor: string;
  bgColor: string;
  eyeColor: string;
  eyeStyle: 'square' | 'circle';
  pattern: 'squares' | 'dots';
  size: number;
  logo?: string;
  createdAt: Date;
  scans: number;
}

const QRCodeSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  text: { type: String, required: true },
  shape: { type: String, required: true },
  fgColor: { type: String, required: true },
  bgColor: { type: String, required: true },
  eyeColor: { type: String, required: true },
  eyeStyle: { type: String, required: true },
  pattern: { type: String, required: true },
  size: { type: Number, required: true },
  logo: { type: String },
  createdAt: { type: Date, default: Date.now },
  scans: { type: Number, default: 0 }
});

export const QRCode = mongoose.model<IQRCode>('QRCode', QRCodeSchema);