import { Router } from "express";
import { openUrl, shorten, urlsId } from "../controllers/urls.controllers.js";
import { authValidation } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validadeSchema.middleware.js";
import { urlSchema } from "../schemas/url.schemas.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", validateSchema(urlSchema), authValidation, shorten);
urlRouter.get("/urls/:id", urlsId);
urlRouter.get("/urls/open/:shortUrl", openUrl);

export default urlRouter;