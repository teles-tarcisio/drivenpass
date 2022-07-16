import { Router } from "express";
import {
  validateSchema,
  ensureAuthentication,
} from "../middlewares/index.js";
import { newSafeNoteSchema } from "../schemas/newSafeNoteSchema.js";
import { safeNotesController } from "../controllers/index.js";

const safeNotesRouter = Router();
safeNotesRouter.use(ensureAuthentication);

safeNotesRouter.post("/safenotes/new",
  validateSchema(newSafeNoteSchema),
  safeNotesController.create,
);

safeNotesRouter.get("/safenotes/get",
  //safeNotesController.get,
);

safeNotesRouter.delete("/safenotes/:id",
  //safeNotesController.exclude,
);

export default safeNotesRouter;