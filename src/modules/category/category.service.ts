import { prisma } from "../../config/db.config";

export class CategoryService {
  constructor(
    private prismaService = prisma,
  ) {}
  // Create new category
  async createCategory(data: 
    {
         name: string; description?: string 

    }) {
    return await this.prismaService.category.create({
      data,
    });
  }

  // Get all categories
  async getAllCategories() {
    return await this.prismaService.category.findMany({
      include: {
        complaints: true,
      },
    });
  }

  // Get single category
  async getCategoryById(id: string) {
    return await this.prismaService.category.findUnique({
      where: { id },
      include: {
        complaints: true,
      },
    });
  }

  // Update category
  async updateCategory(id: string, data: any) {
    return await this.prismaService.category.update({
      where: { id },
      data,
    });
  }

  // Delete category
  async deleteCategory(id: string) {
    return await this.prismaService.category.delete({
      where: { id },
    });
  }
}