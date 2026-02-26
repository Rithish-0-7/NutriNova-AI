import mongoose from 'mongoose';

const mealSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    foodItems: [{ type: String }],
    calories: { type: Number, default: 0 },
    imageUrl: { type: String },
    macros: {
      protein: { type: Number, default: 0 },
      carbs: { type: Number, default: 0 },
      fat: { type: Number, default: 0 }
    }
  },
  { timestamps: true }
);

mealSchema.index({ userId: 1, createdAt: -1 });

export const Meal = mongoose.models.Meal || mongoose.model('Meal', mealSchema);
