import { Router } from "express";
import { getCategories, insertCategorie } from "../controllers/categoriesController.js";
import { validateNewCategorie } from "../middlewares/validateNewCategorie.js";
import categorieSchema from "../schemas/categorieSchema.js";

const categoriesRouter = Router();

categoriesRouter.get('/categories', getCategories);
categoriesRouter.post('/categories', validateNewCategorie(categorieSchema), insertCategorie);

export default categoriesRouter;