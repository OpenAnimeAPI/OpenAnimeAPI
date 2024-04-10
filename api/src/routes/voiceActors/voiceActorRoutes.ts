import express from 'express';
import { voiceActorsController } from '@@controllers/index.js';
import { extractPaginationParams, validation } from '@@middleware/index.js';

const router = express.Router();

router.route("/")
.get(extractPaginationParams, voiceActorsController.index)
.post(voiceActorsController.create)

router.route("/id/:id")
.get(validation.id, voiceActorsController.getOne)
.put(validation.id, voiceActorsController.update)
.delete(validation.id, voiceActorsController.destroy)

export default router;