import { Router } from "express";
import {
  //validateSchema,
  ensureAuthentication,
} from "../middlewares/index.js";
//import { newUserSchema } from "../schemas/newUserSchema.js";
//import { userController } from "../controllers/index.js";

const credentialsRouter = Router();
credentialsRouter.use(ensureAuthentication);

credentialsRouter.get("/test-auth",
  (req, res) => {
    // após auth!!
    return res.status(501).send("credentials");
  }
);

export default credentialsRouter;