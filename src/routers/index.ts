import { Router } from "express";
import userRouter from "./userRouter.js";
import credentialsRouter from "./credentialsRouter.js";

const mainRouter = Router();
mainRouter.use(userRouter);
mainRouter.use(credentialsRouter);


export default mainRouter;