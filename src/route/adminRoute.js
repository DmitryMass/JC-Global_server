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

const router = Router();

// Goals Routes
// verifyUserRequest,
// добавить верификацию админа
router.get('/goals', getCurrentCompanyGoals);
router.post('/goals', createCompanyGoals);
router.delete('/goals/:id', deleteCompanyGoals);
router.put('/goals/:id', editCompanyGoals);
router.get('/archivedGoals', getArchivedGoals);
router.patch('/goals/:id', archivedCompanyGoal);

// News Routes
router.get('/news', getNews);
router.post('/news', createNews);
router.delete('/news/:id', deleteNews);

export default router;
