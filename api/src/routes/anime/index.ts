import express from 'express';
import animeRoutes from '@@root/routes/anime/animeRoutes';
import { animeController } from "@@root/controllers";
import { validation } from "@@middleware/index.js";

const router = express.Router();

router.use("/", animeRoutes);

router.route("/id/:id")
    .post(validation.id, animeController.create)


export default router;