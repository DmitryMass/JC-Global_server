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

const router = Router();

router.get('/goals', getCurrentCompanyGoals);
router.post('/goals', verifyUserRequest, createCompanyGoals);
router.delete('/goals/:id', verifyUserRequest, deleteCompanyGoals);
router.put('/goals/:id', verifyUserRequest, editCompanyGoals);
router.get('/archivedGoals', verifyUserRequest, getArchivedGoals);
router.patch('/goals/:id', verifyUserRequest, archivedCompanyGoal);

export default router;
