import mongoose, { Schema } from 'mongoose';

const CategorySchema = Schema(
  {
    sales: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Employee' }],
      default: [],
    },
    hr: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Employee' }],
      default: [],
    },
    accountants: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Employee' }],
      default: [],
    },
  },
  { timestamps: true }
);

const Category = mongoose.model('Category', CategorySchema);
export default Category;
