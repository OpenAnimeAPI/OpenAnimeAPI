import express from "express";
import { animeController } from "@@controllers/index.js";
import { extractPaginationParams, validation } from "@@middleware/index.js";

const animeRoutes = express.Router();

animeRoutes.route("/")
    .get(extractPaginationParams, animeController.index)
    .post(animeController.create);

animeRoutes.route("/id/:id")
    .get(validation.id, animeController.getOne)
    .put(validation.id, animeController.update)
    .delete(validation.id, animeController.destroy);

export default animeRoutes;
    