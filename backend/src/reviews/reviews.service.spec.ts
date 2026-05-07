import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsService } from './reviews.service';

describe('ReviewsService', () => {
  let reviewsService: ReviewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewsService],
    }).compile();

    reviewsService = module.get<ReviewsService>(ReviewsService);
  });

  describe('create', () => {
    it('should create a review', async () => {
      const result = await reviewsService.create('prod-123', 'user-123', {
        rating: 5,
        comment: 'Great product!',
      });

      expect(result).toHaveProperty('id');
      expect(result.productId).toBe('prod-123');
      expect(result.rating).toBe(5);
    });
  });

  describe('findByProduct', () => {
    it('should return reviews for a product', async () => {
      await reviewsService.create('prod-123', 'user-123', { rating: 5, comment: 'Great!' });
      await reviewsService.create('prod-123', 'user-456', { rating: 4, comment: 'Good!' });

      const result = await reviewsService.findByProduct('prod-123');

      expect(result.length).toBe(2);
    });

    it('should return empty array for product without reviews', async () => {
      const result = await reviewsService.findByProduct('prod-without-reviews');
      expect(result.length).toBe(0);
    });
  });
});