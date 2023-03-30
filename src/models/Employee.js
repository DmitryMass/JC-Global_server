import mongoose, { Schema } from 'mongoose';

const EmployeeSchema = mongoose.Schema(
  {
    role: {
      type: String,
      default: 'Employee',
    },
    email: {
      type: String,
      required: true,
      max: 70,
    },
    name: {
      type: String,
      required: true,
      min: 2,
      max: 25,
    },
    surname: {
      type: string,
      required: true,
      min: 2,
      max: 30,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    photoPath: {
      type: String,
      default: '',
    },
    jobTitle: {
      type: String,
      required: true,
      max: 70,
    },
    vacation: {
      type: String,
      default: '0',
    },
    schedule: [
      {
        _id: false,
        id: { type: Schema.Types.ObjectId, required: true, auto: true },
        day: { type: String, required: true },
        time: { type: String, required: true },
        // workedShift: { type: Boolean, default: false },
        // workDay: { type: String, default: '0' },
        // workHours: { type: String, default: '10' },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Employee = mongoose.model('Employee', EmployeeSchema);
