import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    schedule: [{ type: Object, required: true }]
  },
  { timestamps: true }
);

workoutSchema.index({ userId: 1, createdAt: -1 });

export const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);
