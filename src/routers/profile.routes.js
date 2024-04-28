import { Router } from 'express';
import {
  createProfile,
  listAllProfiles,
  profileById,
  updateProfile,
  deleteProfile,
} from '../controllers/profile.controller.js';

const router = Router();

router.post('/profile', createProfile);
router.get('/profiles', listAllProfiles);
router
  .route('/profile/:id')
  .get(profileById)
  .put(updateProfile)
  .delete(deleteProfile);
export default router;
