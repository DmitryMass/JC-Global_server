import { Router } from 'express';
import { getCurrentCompanyGoals } from '../controllers/companyGoals.js';

const router = Router();

router.get('/goals', getCurrentCompanyGoals);

export default router;
