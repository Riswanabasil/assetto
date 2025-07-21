import express from 'express';
import { ManufacturerController } from '../controllers/ManufacturerController';
import { ManufacturerRepository } from '../repositories/ManufacturerRepository';
import { ManufacturerService } from '../services/ManufacturerService';

const router = express.Router();
const repo= new ManufacturerRepository()
const service= new ManufacturerService(repo)
const controller = new ManufacturerController(service);

router.post('/', controller.create.bind(controller));
router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
