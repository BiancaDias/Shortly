import { Router } from "express";
import { validateSchema } from "../middlewares/validadeSchema.middleware.js";
import { signUp, singIn } from "../controllers/user.controllers.js";
import { signInSchema, signUpSchema } from "../schemas/user.schemas.js";

const userRouter = Router();

userRouter.post("/signup", validateSchema(signUpSchema), signUp)
userRouter.post("/signin", validateSchema(signInSchema), singIn)

export default userRouter;