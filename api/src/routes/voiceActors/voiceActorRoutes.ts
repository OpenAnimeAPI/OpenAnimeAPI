import express from 'express';
import { voiceActorsController } from '@@controllers/index.js';

const router = express.Router();

router.route("/")
.get(voiceActorsController.index)
.post(voiceActorsController.create)

router.route("/id/:id")
.get(voiceActorsController.getOne)
.put(voiceActorsController.update)
.delete(voiceActorsController.destroy)

export default router;