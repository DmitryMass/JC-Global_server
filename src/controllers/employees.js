import { compare, hash } from 'bcrypt';
import { Employee } from '../models/Employee.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import Category from '../models/Category.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Auth
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

    const categories = await Category.findOne();
    if (categories) {
      await categories.updateOne({
        [category.toLowerCase()]: [
          ...categories[category.toLowerCase()],
          newEmployee._id,
        ],
      });
    }

    if (!file) {
      return res.status(200).send({ msg: 'Співробітника додано без фото' });
    }

    file.mv(`${__dirname}/assets/${newFileName}`, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      return res.status(200).send({ msg: 'Співробітника додано' });
    });
  } catch (err) {
    return res
      .status(500)
      .send({ msg: 'Помилка серверу при реєстрації співробітника.' });
  }
};

// Employees

export const getEmployees = async (req, res) => {
  try {
    const categories = await Category.find()
      .populate('sales')
      .populate('hr')
      .populate('accountants');
    return res.status(200).send(categories);
  } catch (err) {
    return res
      .status(500)
      .send({ msg: 'Проблема з сервером при отриманні співробітників' });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    if (!employee)
      return res.status(404).send({ msg: 'Співробітника не знайдено' });
    return res.status(200).send(employee);
  } catch (err) {
    return res
      .status(200)
      .send({ msg: 'Проблеми з сервером при отриманні співробітника' });
  }
};