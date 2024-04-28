import { Router } from 'express';
import {
  creteService,
  listAllServices,
  ServiceById,
  updateService,
  deleteService,
  changeService,
} from '../controllers/service.controller.js';

const router = Router();

router.post('/service', creteService);
router.get('/services', listAllServices);
router
  .route('/service/:id')
  .get(ServiceById)
  .put(updateService)
  .delete(deleteService)
  .patch(changeService);

export default router;
