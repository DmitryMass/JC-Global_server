import { compare, hash } from 'bcrypt';
import * as dotenv from 'dotenv';
dotenv.config();
import { Employee } from '../models/Employee.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import Category from '../models/Category.js';
import pkg from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const monthLabels = [
  'Січень',
  'Лютий',
  'Березень',
  'Квітень',
  'Травень',
  'Червень',
  'Липень',
  'Серпень',
  'Вересень',
  'Жовтень',
  'Листопад',
  'Грудень',
];

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

    const sortedPlan = employee.plans.sort((a, b) => {
      return monthLabels.indexOf(a.month) - monthLabels.indexOf(b.month);
    });
    await employee.updateOne({
      plans: sortedPlan,
    });
    await employee.save();

    const updatedEmployee = await Employee.findById(id);

    return res.status(200).send(updatedEmployee);
  } catch (err) {
    return res
      .status(500)
      .send({ msg: 'Проблеми з сервером при отриманні співробітника' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res
        .status(404)
        .send({ msg: 'Співробітника з такою поштою не існує.' });
    }

    const checkPassword = await compare(password, employee.password);
    if (!checkPassword)
      return res.status(401).send({ msg: 'Введені не вірні данні.' });
    const token = pkg.sign({ id: employee._id }, process.env.SECRET_KEY);
    return res.status(200).send({
      userData: {
        id: employee._id,
        email: employee.email,
        fullName: employee.fullName,
        role: employee.role,
        token,
      },
    });
  } catch (err) {
    return res.status(500).send({ msg: 'Помилка при логуванні' });
  }
};

export const fireEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).send({ msg: 'Співробітника не знайдено' });
    }
    await Category.updateMany(
      {
        $or: [{ sales: id }, { hr: id }, { accountants: id }],
      },
      {
        $pull: {
          sales: id,
          hr: id,
          accountants: id,
        },
      }
    );

    await employee.deleteOne({ _id: id });
    return res.status(200).send({ msg: 'Співробітника звільнено.' });
  } catch (err) {
    return res
      .status(500)
      .send({ msg: 'Не вдалося звільнити співробітника. Помилка серверу.' });
  }
};
