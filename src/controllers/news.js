import News from '../models/News.js';

export const getNews = async (req, res) => {
  try {
    const news = await News.find();
    if (!news) return res.status(404).send({ msg: 'Новостей пока нет.' });

    return res.status(200).send(news);
  } catch (err) {
    return res
      .status(500)
      .send({ msg: 'Ошибка сервера при получении всех новостей' });
  }
};

export const createNews = async (req, res) => {
  try {
    const { text, header, imgPath } = req.body;
    const newNews = new News({
      text,
      header,
      imgPath,
    });
    await newNews.save();
    return res.status(200).send({ msg: 'Новость создана' });
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
    await news.remove();
    return res.status(200).send({ msg: 'Новость удалена' });
  } catch (err) {
    return res.status(500).send({ msg: 'Ошибка сервера при удалении новости' });
  }
};
