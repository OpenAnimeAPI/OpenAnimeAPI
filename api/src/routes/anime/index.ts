import express from 'express';
import animeRoutes from '@@routes/anime/animeRoutes.js';

const router = express.Router();

router.use("/", animeRoutes);


export default router;