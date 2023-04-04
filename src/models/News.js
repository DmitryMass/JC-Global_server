import { Schema, model } from 'mongoose';

const NewsSchema = Schema(
  {
    header: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      default: '',
    },
    imgPath: {
      type: Array,
      default: [],
    },
    checked: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const News = model('News', NewsSchema);
export default News;
