import { Router } from 'express';
import {
  editEmployeeData,
  fireEmployee,
  getEmployee,
  getEmployees,
  login,
  resetPassword,
} from '../controllers/employees.js';

const router = Router();

router.get('/categories', getEmployees);
router.get('/employee/:id', getEmployee);
router.post('/login', login);
router.post('/resetpassword', resetPassword);
router.delete('/:id', fireEmployee);
router.put('/employee/:id', editEmployeeData);

export default router;
