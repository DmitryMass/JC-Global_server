import { Router } from 'express';
import { getEmployee, getEmployees } from '../controllers/employees.js';

const router = Router();

router.get('/categories', getEmployees);
router.get('/employee/:id', getEmployee);

export default router;
