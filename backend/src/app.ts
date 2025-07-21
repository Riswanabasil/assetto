import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import assetCategoryRoutes from './routes/assetCategoryRoutes';
import assetSubcategoryRoutes from './routes/assetSubcategoryRoutes';
import branchRoutes from './routes/branchRoutes';
import vendorRoutes from './routes/vendorRoutes';
import manufacturerRoutes from './routes/manufacturerRoutes'
import grnRoutes from './routes/grnRoutes';


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/asset-categories', assetCategoryRoutes);
app.use('/api/asset-subcategories', assetSubcategoryRoutes)
app.use('/api/branches', branchRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/manufacturers', manufacturerRoutes)
app.use('/api/grns', grnRoutes);

app.get('/', (req, res) => {
  res.send('Assetto API is running ');
});

export default app;
