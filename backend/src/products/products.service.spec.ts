import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { NotFoundException } from '@nestjs/common';

describe('ProductsService', () => {
  let productsService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    productsService = module.get<ProductsService>(ProductsService);
  });

  describe('create', () => {
    it('should create a product successfully', async () => {
      const createProductDto = {
        name: 'Test Product',
        description: 'Description',
        price: 99.99,
        discount: 10,
        stock: 100,
        categoryId: 'cat-123',
        images: ['image1.jpg'],
        rating: 4.5,
      };

      const result = await productsService.create(createProductDto);

      expect(result).toHaveProperty('id');
      expect(result.name).toBe('Test Product');
      expect(result.price).toBe(99.99);
    });
  });

  describe('findAll', () => {
    it('should return all products with pagination', async () => {
      await productsService.create({
        name: 'Product 1',
        description: 'Desc 1',
        price: 10,
        discount: 0,
        stock: 10,
        categoryId: 'cat-1',
        images: [],
        rating: 0,
      });

      const result = await productsService.findAll({ page: 1, limit: 20 });

      expect(result.products.length).toBe(1);
      expect(result.total).toBe(1);
    });

    it('should filter products by category', async () => {
      await productsService.create({
        name: 'Product 1',
        description: 'Desc 1',
        price: 10,
        discount: 0,
        stock: 10,
        categoryId: 'cat-1',
        images: [],
        rating: 0,
      });

      const result = await productsService.findAll({ categoryId: 'cat-2', page: 1, limit: 20 });

      expect(result.products.length).toBe(0);
    });

    it('should search products by name', async () => {
      await productsService.create({
        name: 'Special Widget',
        description: 'Description',
        price: 10,
        discount: 0,
        stock: 10,
        categoryId: 'cat-1',
        images: [],
        rating: 0,
      });

      const result = await productsService.findAll({ search: 'special', page: 1, limit: 20 });

      expect(result.products.length).toBe(1);
      expect(result.products[0].name).toBe('Special Widget');
    });
  });

  describe('findOne', () => {
    it('should return a product by id', async () => {
      const created = await productsService.create({
        name: 'Test Product',
        description: 'Description',
        price: 99.99,
        discount: 10,
        stock: 100,
        categoryId: 'cat-123',
        images: ['image1.jpg'],
        rating: 4.5,
      });

      const result = await productsService.findOne(created.id);

      expect(result.id).toBe(created.id);
      expect(result.name).toBe('Test Product');
    });

    it('should throw NotFoundException for non-existent product', async () => {
      await expect(productsService.findOne('non-existent')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const created = await productsService.create({
        name: 'Original Name',
        description: 'Description',
        price: 99.99,
        discount: 10,
        stock: 100,
        categoryId: 'cat-123',
        images: ['image1.jpg'],
        rating: 4.5,
      });

      const result = await productsService.update(created.id, { name: 'Updated Name' });

      expect(result.name).toBe('Updated Name');
    });

    it('should throw NotFoundException when updating non-existent product', async () => {
      await expect(
        productsService.update('non-existent', { name: 'New Name' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a product', async () => {
      const created = await productsService.create({
        name: 'Test Product',
        description: 'Description',
        price: 99.99,
        discount: 10,
        stock: 100,
        categoryId: 'cat-123',
        images: ['image1.jpg'],
        rating: 4.5,
      });

      const result = await productsService.remove(created.id);

      expect(result.success).toBe(true);
    });

    it('should throw NotFoundException when removing non-existent product', async () => {
      await expect(productsService.remove('non-existent')).rejects.toThrow(NotFoundException);
    });
  });
});