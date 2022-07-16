import { Router } from "express";
import userRouter from "./userRouter.js";
import credentialsRouter from "./credentialsRouter.js";
import safeNotesRouter from "./safeNotesRouter.js";
import cardsRouter from "./cardsRouter.js";

const mainRouter = Router();
mainRouter.use(userRouter);
mainRouter.use(credentialsRouter);
mainRouter.use(safeNotesRouter);
mainRouter.use(cardsRouter);


export default mainRouter;