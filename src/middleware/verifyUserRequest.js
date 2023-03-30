import * as dotenv from 'dotenv';
dotenv.config();

export const verifyUserRequest = async (req, res, next) => {
  try {
    const verifyToken = req.header('Verify');

    if (!verifyToken) {
      return res.status(401).send({ msg: 'Ошибка верификации пользователя' });
    }
    if (verifyToken !== process.env.USER_ROLE)
      return res.status(401).send({ msg: 'У вас нет прав делать это.' });
    next();
  } catch (err) {
    return res.status(500).send({ msg: `Ошибка верификации. Вы не Админ.` });
  }
};
