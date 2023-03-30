import mongoose, { Schema } from 'mongoose';

const CompanyGoalsSchema = mongoose.Schema(
  {
    month: {
      type: String,
      required: true,
    },
    goals: [
      {
        _id: false,
        id: { type: Schema.Types.ObjectId, required: true, auto: true },
        goal: { type: String, required: true },
        complete: { type: Boolean, default: false },
      },
    ],
    archived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const CompanyGoals = mongoose.model('CompanyGoals', CompanyGoalsSchema);
export default CompanyGoals;
