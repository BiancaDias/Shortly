import { Router } from "express";
import { validateSchema } from "../middlewares/validadeSchema.middleware.js";
import { signUp } from "../controllers/user.controllers.js";
import { signUpSchema } from "../schemas/user.schemas.js";

const userRouter = Router();

userRouter.post("/signup", validateSchema(signUpSchema), signUp)

export default userRouter;