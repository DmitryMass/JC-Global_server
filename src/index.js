import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();
import pkg from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import { fileURLToPath } from 'url';
import path from 'path';
import errorHandler from './middleware/errorHandler.js';
//
import adminRoute from './route/adminRoute.js';

// config
const { json, urlencoded } = pkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
mongoose.set('strictQuery', true);

const app = express();
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('common'));
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

app.use('/assets', express.static(path.join(__dirname, './assets')));

// routes
app.use('/admin', adminRoute);
// error handler
app.use(errorHandler);

const start = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(process.env.PORT || 5005, () => {
      console.log(`Server start on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.log(`${err} Error when server start ${process.env.PORT}`);
  }
};
start();
