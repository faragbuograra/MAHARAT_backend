import { Router } from 'express';
import { DashboardController } from './dashboard.controller';

const router = Router();

router.get('/stats', DashboardController.stats);

export default router;
