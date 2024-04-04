import express from "express";
import { animeController } from "@@root/controllers";
import { extractPaginationParams, validation } from "@@middleware/index.js";

const animeRoutes = express.Router();

animeRoutes.route("/")
    .get(extractPaginationParams, animeController.index)
    .post(validation.id, animeController.create);

animeRoutes.route("/id/:id")
    .get(validation.id, animeController.getOne)
    .put(validation.id, animeController.update)
    .delete(validation.id, animeController.destroy);

export default animeRoutes;
    