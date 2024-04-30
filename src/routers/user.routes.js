import { Router } from 'express';
import {
  createUser,
  listAllUsers,
  userById,
  updateUser,
  deleteUser,
} from '../controllers/user.controller.js';

const router = Router();

router.post('/user', createUser);
router.get('/users', listAllUsers);
router
  .route('/user/:id')
  .get(userById)
  .put(updateUser)
  .delete(deleteUser);

export default router;
