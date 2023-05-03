import { Router } from 'express';
import {
  editEmployeeData,
  fireEmployee,
  getEmployee,
  getEmployees,
  login,
} from '../controllers/employees.js';

const router = Router();

router.get('/categories', getEmployees);
router.get('/employee/:id', getEmployee);
router.post('/login', login);
router.delete('/:id', fireEmployee);
router.put('/employee/:id', editEmployeeData);

export default router;
