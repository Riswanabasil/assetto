import express from 'express';
import { AssetCategoryController } from '../controllers/AssetCategoryController';
import { AssetCategoryRepository } from '../repositories/AssetCategoryRepository';
import { AssetCategoryService } from '../services/AssetCategoryService';
const router = express.Router();
const repo= new AssetCategoryRepository()
const service= new AssetCategoryService(repo)
const controller = new AssetCategoryController(service);

router.post('/', controller.create.bind(controller));
router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.remove.bind(controller));

export default router;
