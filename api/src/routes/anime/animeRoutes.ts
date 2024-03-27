import express from "express";
import { animeController } from "@@root/controllers";
import { extractPaginationParams } from "@@root/middleware";

const animeRoutes = express.Router();

animeRoutes.route("/anime").get(extractPaginationParams, animeController.index);

animeRoutes.route("/anime/:id")
    .post(animeController.create)
    .get(animeController.read)
    .put(animeController.update)
    .delete(animeController.destroy);

export default animeRoutes;