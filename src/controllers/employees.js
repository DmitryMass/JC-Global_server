import { compare, hash } from 'bcrypt';
import { Employee } from '../models/Employee.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const employeeRegister = async (req, res) => {
  try {
    const { email, password, fullName, phoneNumber, jobTitle, category } =
      req.body;

    const isEmployee = await Employee.findOne({ email });
    if (isEmployee)
      return res.status(404).send({ msg: 'Такий співробітник вже існує.' });

    const file = req.files?.file;
    const newFileName = file ? encodeURI(Date.now() + '-' + file.name) : null;

    const newEmployee = new Employee({
      email,
      fullName,
      phoneNumber,
      jobTitle,
      category,
      password: await hash(password, 5),
      photoPath: newFileName ? newFileName : '',
    });

    await newEmployee.save();

    if (file) {
      file.mv(`${__dirname}/assets/${newFileName}`, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        }
        return res.status(200).send({ msg: 'Співробітника додано' });
      });
    }

    return res.status(200).send({ msg: 'Співробітника додано' });
  } catch (err) {
    return res
      .status(500)
      .send({ msg: 'Помилка серверу при реєстрації співробітника.' });
  }
};
