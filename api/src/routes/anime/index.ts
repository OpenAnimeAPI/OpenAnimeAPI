import express from 'express';
import animeRoutes from '@@root/routes/anime/animeRoutes';

const router = express.Router();

router.use("/", animeRoutes);

export default router;