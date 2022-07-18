import { Router } from "express";
import {
  validateSchema,
  ensureAuthentication,
} from "../middlewares/index.js";
import { newWifiNetSchema } from "../schemas/newWifiNetSchema.js";
import { wifiNetsController } from "../controllers/index.js";

const wifiNetsRouter = Router();
wifiNetsRouter.use(ensureAuthentication);

wifiNetsRouter.post("/wifinets/new",
  validateSchema(newWifiNetSchema),
  wifiNetsController.create,
);

wifiNetsRouter.get("/wifinets/get",
  wifiNetsController.get,
);

wifiNetsRouter.delete("/wifinets/:id",
  wifiNetsController.exclude,
);

export default wifiNetsRouter;