import { Router } from "express";
import userRouter from "./userRouter.js";
import credentialsRouter from "./credentialsRouter.js";
import safeNotesRouter from "./safeNotesRouter.js";

const mainRouter = Router();
mainRouter.use(userRouter);
mainRouter.use(credentialsRouter);
mainRouter.use(safeNotesRouter);


export default mainRouter;