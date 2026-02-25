import { Router } from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "./category.controller";

const categoryRouter = Router();

categoryRouter.post("/categories", createCategory);
categoryRouter.get("/categories", getAllCategories);
categoryRouter.get("/categories/:id", getCategoryById);
categoryRouter.put("/categories/:id", updateCategory);
categoryRouter.delete("/categories/:id", deleteCategory);

export default categoryRouter;