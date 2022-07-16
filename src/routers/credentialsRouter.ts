import { Router } from "express";
import {
  validateSchema,
  ensureAuthentication,
} from "../middlewares/index.js";
import { newCredentialSchema } from "../schemas/newCredentialSchema.js";
import { credentialsController } from "../controllers/index.js";

const credentialsRouter = Router();
credentialsRouter.use(ensureAuthentication);

credentialsRouter.post("/credentials/new",
  validateSchema(newCredentialSchema),
  credentialsController.create,
);

credentialsRouter.get("/credentials/get",
  credentialsController.get,
);

credentialsRouter.delete("/credentials/:id",
  credentialsController.exclude,
);

export default credentialsRouter;