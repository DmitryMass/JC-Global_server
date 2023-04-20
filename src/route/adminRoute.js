import { Router } from 'express';
import {
  archivedCompanyGoal,
  createCompanyGoals,
  deleteCompanyGoals,
  editCompanyGoals,
  getArchivedGoals,
  getCurrentCompanyGoals,
} from '../controllers/companyGoals.js';
import { verifyUserRequest } from '../middleware/verifyUserRequest.js';
import { createNews, deleteNews, getNews } from '../controllers/news.js';
import { employeeRegister } from '../controllers/employees.js';
import {
  createOrUpdateEmployeePlan,
  setEmployeeActivePlan,
} from '../controllers/plans.js';

const router = Router();

// Goals Routes
// verifyUserRequest,
// добавить верификацию админа
router.get('/goals', getCurrentCompanyGoals);
router.post('/goals', verifyUserRequest, createCompanyGoals);
router.delete('/goals/:id', verifyUserRequest, deleteCompanyGoals);
router.put('/goals/:id', verifyUserRequest, editCompanyGoals);
router.get('/archivedGoals', getArchivedGoals);
router.patch('/goals/:id', verifyUserRequest, archivedCompanyGoal);

// News Routes
router.get('/news', getNews);
router.post('/news', verifyUserRequest, createNews);
router.delete('/news/:id', verifyUserRequest, deleteNews);

// employee
router.post('/plan/:id', verifyUserRequest, createOrUpdateEmployeePlan);
router.post('/employeePlan/:id', setEmployeeActivePlan);
// Register employeer
router.post('/register', verifyUserRequest, employeeRegister);

export default router;
