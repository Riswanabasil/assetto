import express from 'express';
import { GRNController } from '../controllers/GRNController';
import { GRNRepository } from '../repositories/GRNRepository';
import { GRNService } from '../services/GRNService';

const router = express.Router();
const repo= new GRNRepository()
const service= new GRNService(repo)
const controller = new GRNController(service);

router.post('/', controller.create.bind(controller));
router.get('/', controller.getAll.bind(controller));
router.get('/filter', controller.filterGRN.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.delete('/:id', controller.delete.bind(controller));


export default router;
