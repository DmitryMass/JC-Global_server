import News from '../models/News.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getNews = async (req, res) => {
  try {
    const news = await News.find();
    if (!news) return res.status(404).send({ msg: 'Новостей пока нет.' });

    return res.status(200).send(news.sort((a, b) => b.createdAt - a.createdAt));
  } catch (err) {
    return res
      .status(500)
      .send({ msg: 'Ошибка сервера при получении всех новостей' });
  }
};

export const createNews = async (req, res) => {
  try {
    const { text, header } = req.body;

    if (!req.files) {
      const newNews = new News({
        text,
        header,
      });
      await newNews.save();
      const news = await News.find();
      return res.status(200).send(news);
    }

    if (!Array.isArray(req.files.files)) {
      const newFileName = `${Date.now()}-${req.files.files.name}`;
      const newNews = new News({
        text,
        header,
        imgPath: [newFileName],
      });
      await newNews.save();
      const news = await News.find();

      req.files.files.mv(`${__dirname}/assets/${newFileName}`, (err) => {
        if (err) {
          return res.status(400).send(err);
        }
      });
      return res.status(200).send(news);
    }

    const paths = req.files.files.map((file) => {
      const newFileName = `${Date.now()}-${file.name}`;
      file.mv(`${__dirname}/assets/${newFileName}`, (err) => {
        if (err) {
          return res.status(400).send(err);
        }
      });
      return encodeURI(newFileName);
    });

    const newNews = new News({
      text,
      header,
      imgPath: paths,
    });
    await newNews.save();

    const news = await News.find();

    return res.status(200).send(news);
  } catch (err) {
    return res.status(500).send({ msg: 'Ошибка сервера при создании новости' });
  }
};

export const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.findById(id);
    if (!news)
      return res.status(404).send({ msg: 'Такой новости не существует' });

    news.imgPath.forEach((img) => {
      const filePath = path.join(__dirname, 'assets', img);
      fs.unlink(filePath, (err) => {
        if (err) {
          return res
            .status(400)
            .send({ msg: 'Ошибка сервера при удалении Файлов из новостей' });
        }
      });
    });

    await News.findByIdAndDelete(id);
    return res.status(200).send({ msg: 'Новость удалена' });
  } catch (err) {
    return res.status(500).send({ msg: 'Ошибка сервера при удалении новости' });
  }
};
