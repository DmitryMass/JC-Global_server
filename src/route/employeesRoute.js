import { Router } from 'express';
import { getEmployee, getEmployees, login } from '../controllers/employees.js';

const router = Router();

router.get('/categories', getEmployees);
router.get('/employee/:id', getEmployee);
router.post('/login', login);

export default router;
