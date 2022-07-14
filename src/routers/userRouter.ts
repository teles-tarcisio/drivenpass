import { Router } from "express";
import { validateSchema } from "../middlewares/index.js";
import { newUserSchema } from "../schemas/newUserSchema.js";
import { userController } from "../controllers/index.js";

const userRouter = Router();

userRouter.post("/sign-up",
  validateSchema(newUserSchema),
  userController.create,
);

export default userRouter;