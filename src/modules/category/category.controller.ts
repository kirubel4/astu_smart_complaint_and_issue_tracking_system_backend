import { Request, Response } from "express";
import { CategoryService } from "./category.service";

const categoryService = new CategoryService();

// helper to ensure a single string parameter
function ensureString(param: unknown, name: string): string {
  if (typeof param === "string" && param.trim() !== "") return param;
  throw new Error(`Missing or invalid ${name}`);
}


export const createCategory = async (req: Request, res: Response) => {
  try {
    const result = await categoryService.createCategory(req.body);

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({ success: false, error: error.message });
  }
};


export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const result = await categoryService.getAllCategories();
    return res.json({ success: true, data: result });
  } catch (error: any) {
    return res.status(400).json({ success: false, error: error.message });
  }
};


export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const id = ensureString(req.params.id, "id");

    const result = await categoryService.getCategoryById(id);

    if (!result) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    return res.json({ success: true, data: result });
  } catch (error: any) {
    return res.status(400).json({ success: false, error: error.message });
  }
};


export const updateCategory = async (req: Request, res: Response) => {
  try {
    const id = ensureString(req.params.id, "id");
    const result = await categoryService.updateCategory(id, req.body);

    return res.json({
      success: true,
      message: "Category updated successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({ success: false, error: error.message });
  }
};


export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const id = ensureString(req.params.id, "id");

    await categoryService.deleteCategory(id);

    return res.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error: any) {
    return res.status(400).json({ success: false, error: error.message });
  }
};