import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    weight: { type: Number, required: true },
    date: { type: Date, required: true }
  },
  { timestamps: true }
);

progressSchema.index({ userId: 1, date: -1 });

export const Progress = mongoose.models.Progress || mongoose.model('Progress', progressSchema);
