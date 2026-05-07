import { Injectable } from '@nestjs/common';
import { CreateReviewDto, ReviewResponseDto } from '../shared/dto/review.dto';
import { generateUuid } from '../shared/utils';

@Injectable()
export class ReviewsService {
  private reviews: Map<string, any> = new Map();

  async findByProduct(productId: string): Promise<ReviewResponseDto[]> {
    return Array.from(this.reviews.values()).filter(review => review.productId === productId);
  }

  async create(productId: string, userId: string, createReviewDto: CreateReviewDto): Promise<ReviewResponseDto> {
    const review = {
      id: generateUuid(),
      productId,
      userId,
      rating: createReviewDto.rating,
      comment: createReviewDto.comment,
      createdAt: new Date().toISOString(),
    };
    this.reviews.set(review.id, review);
    return review;
  }
}