import { Router } from 'express';
import {
  archivedCompanyGoal,
  createCompanyGoals,
  deleteCompanyGoals,
  editCompanyGoals,
  getArchivedGoals,
  getCurrentCompanyGoals,
} from '../controllers/companyGoals.js';

const router = Router();

router.get('/goals', getCurrentCompanyGoals);
router.post('/goals', createCompanyGoals);
router.delete('/goals/:id', deleteCompanyGoals);
router.put('/goals/:id', editCompanyGoals);
router.get('/archivedGoals', getArchivedGoals);
router.patch('/goals/:id', archivedCompanyGoal);

export default router;
