import express from 'express';
import { VendorController } from '../controllers/VendorController';
import { VendorRepository } from '../repositories/VendorRepository';
import { VendorService } from '../services/VendorService';

const router = express.Router();
const repo= new VendorRepository()
const service= new VendorService(repo)
const controller = new VendorController(service);

router.post('/', controller.create.bind(controller));
router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
