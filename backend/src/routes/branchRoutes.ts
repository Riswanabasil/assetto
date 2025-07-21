import express from 'express';
import { BranchRepository } from '../repositories/BranchRepository';
import { BranchService } from '../services/BranchService';
import { BranchController } from '../controllers/BranchController';

const repo= new BranchRepository()
const service= new BranchService(repo)
const controller=new BranchController(service)

const router = express.Router();


router.post('/', controller.create.bind(controller));
router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
