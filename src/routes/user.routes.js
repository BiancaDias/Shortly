import { Router } from "express";
import { validateSchema } from "../middlewares/validadeSchema.middleware.js";
import { signUp, singIn, usersMe } from "../controllers/user.controllers.js";
import { signInSchema, signUpSchema } from "../schemas/user.schemas.js";
import { authValidation } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.post("/signup", validateSchema(signUpSchema), signUp)
userRouter.post("/signin", validateSchema(signInSchema), singIn)
userRouter.get("/users/me", authValidation, usersMe)

export default userRouter;