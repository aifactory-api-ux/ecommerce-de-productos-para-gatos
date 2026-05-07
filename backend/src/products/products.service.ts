import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto, ProductResponseDto, ProductQueryDto } from '../shared/dto/product.dto';
import { generateUuid } from '../shared/utils';

@Injectable()
export class ProductsService {
  private products: Map<string, any> = new Map();
  private categories: Map<string, any> = new Map();

  async create(createProductDto: CreateProductDto): Promise<ProductResponseDto> {
    const product = {
      id: generateUuid(),
      ...createProductDto,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.products.set(product.id, product);
    return product;
  }

  async findAll(query: ProductQueryDto): Promise<{ products: ProductResponseDto[]; total: number; page: number; limit: number }> {
    let products = Array.from(this.products.values());

    if (query.categoryId) {
      products = products.filter(p => p.categoryId === query.categoryId);
    }

    if (query.search) {
      const search = query.search.toLowerCase();
      products = products.filter(p =>
        p.name.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search)
      );
    }

    const total = products.length;
    const page = query.page || 1;
    const limit = query.limit || 20;
    const start = (page - 1) * limit;
    const paginatedProducts = products.slice(start, start + limit);

    return {
      products: paginatedProducts,
      total,
      page,
      limit,
    };
  }

  async findOne(id: string): Promise<ProductResponseDto> {
    const product = this.products.get(id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<ProductResponseDto> {
    const product = this.products.get(id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    const updated = {
      ...product,
      ...updateProductDto,
      updatedAt: new Date().toISOString(),
    };
    this.products.set(id, updated);
    return updated;
  }

  async remove(id: string): Promise<{ success: boolean }> {
    if (!this.products.has(id)) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    this.products.delete(id);
    return { success: true };
  }

  async findAllCategories(): Promise<any[]> {
    return Array.from(this.categories.values());
  }

  async createCategory(category: any): Promise<any> {
    const newCategory = {
      id: generateUuid(),
      ...category,
    };
    this.categories.set(newCategory.id, newCategory);
    return newCategory;
  }

  async updateCategory(id: string, category: any): Promise<any> {
    if (!this.categories.has(id)) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    const updated = { ...this.categories.get(id), ...category };
    this.categories.set(id, updated);
    return updated;
  }

  async removeCategory(id: string): Promise<{ success: boolean }> {
    if (!this.categories.has(id)) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    this.categories.delete(id);
    return { success: true };
  }
}