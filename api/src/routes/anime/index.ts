import express from 'express';
import animeRoutes from '@@routes/anime/animeRoutes.js';

/**
 * Express router for handling anime routes.
 */
const router = express.Router();

router.use("/", animeRoutes);


export default router;