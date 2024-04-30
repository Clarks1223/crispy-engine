import { Router } from 'express';
import {
  createProfileForUser,
  getUserProfile,
  deleteProfileForUser,
} from '../controllers/userProfile.controller.js';

const router = Router();

router.post('./users/:id/profile', createProfileForUser);
router.get('./users/:userId/profile', getUserProfile);
router.delete('./users/:userId/profile', deleteProfileForUser);

export default router;
