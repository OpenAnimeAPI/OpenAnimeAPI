import express from 'express';
import voiceActorRoutes from './voiceActorRoutes.js';

const router = express.Router();

router.use("/", voiceActorRoutes);

export default router;