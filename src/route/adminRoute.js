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
router.get('/goals', getCurrentCompanyGoals);
router.post('/goals', verifyUserRequest, createCompanyGoals);
router.delete('/goals/:id', verifyUserRequest, deleteCompanyGoals);
router.put('/goals/:id', verifyUserRequest, editCompanyGoals);
router.get('/archivedGoals', verifyUserRequest, getArchivedGoals);
router.patch('/goals/:id', verifyUserRequest, archivedCompanyGoal);

// News Routes
router.get('/news', getNews);
router.post('/news', verifyUserRequest, createNews);
router.delete('/news/:id', verifyUserRequest, deleteNews);

export default router;
