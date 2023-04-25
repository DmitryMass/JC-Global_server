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
    fullName: {
      type: String,
      required: true,
      min: 2,
      max: 80,
    },
    password: {
      type: String,
      required: true,
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
    category: {
      type: String,
      default: '',
    },
    schedule: {
      type: Array,
      default: [],
    },
    plans: {
      type: Array,
      default: [],
    },
    archive: {
      type: Array,
      default: [],
    },
    archivePlan: {
      type: Array,
      default: [],
      created_at: {
        type: Date,
        default: Date.now,
        expires: '24m',
      },
    },
  },
  {
    timestamps: true,
  }
);
// Данные архива удаляются через 24месяца либо пока их не удалят.

export const Employee = mongoose.model('Employee', EmployeeSchema);
