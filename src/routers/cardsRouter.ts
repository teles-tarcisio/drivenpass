import { Router } from "express";
import {
  validateSchema,
  ensureAuthentication,
} from "../middlewares/index.js";
import { newCardSchema } from "../schemas/newCardSchema.js";
import { cardsController } from "../controllers/index.js";

const cardsRouter = Router();
cardsRouter.use(ensureAuthentication);

cardsRouter.post("/cards/new",
  validateSchema(newCardSchema),
  cardsController.create,
);

cardsRouter.get("/cards/get",
cardsController.get,
);

cardsRouter.delete("/cards/:id",
  cardsController.exclude,
);

export default cardsRouter;