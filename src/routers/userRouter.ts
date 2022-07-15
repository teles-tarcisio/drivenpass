import { Router } from "express";
import {
  validateSchema,
  ensureAuthentication,
} from "../middlewares/index.js";
import { newUserSchema } from "../schemas/newUserSchema.js";
import { userController } from "../controllers/index.js";

const userRouter = Router();

userRouter.post("/sign-up",
  validateSchema(newUserSchema),
  userController.create,
);

userRouter.post("/sign-in",
  validateSchema(newUserSchema),
  userController.login,
);

userRouter.get("/test-auth",
  ensureAuthentication,
  (req, res) => {
    return res.status(501).send("authenticated?");
  }
);

export default userRouter;