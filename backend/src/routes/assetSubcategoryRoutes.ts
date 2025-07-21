import express from 'express';
import { AssetSubcategoryController } from '../controllers/AssetSubcategoryController';
import { AssetSubcategoryRepository } from '../repositories/AssetSubcategoryRepository';
import { AssetSubcategoryService } from '../services/AssetSubcategoryService';

const router = express.Router();
const repo= new AssetSubcategoryRepository()
const service= new AssetSubcategoryService(repo)
const controller = new AssetSubcategoryController(service);

router.post('/', controller.create.bind(controller));
router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
