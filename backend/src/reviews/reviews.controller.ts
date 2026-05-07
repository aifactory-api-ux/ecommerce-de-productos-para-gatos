import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from '../shared/dto/review.dto';
import { JwtAuthGuard } from '../auth/strategies/jwt.strategy';

@Controller('products')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get(':productId/reviews')
  async findByProduct(@Param('productId') productId: string) {
    return this.reviewsService.findByProduct(productId);
  }

  @Post(':productId/reviews')
  @UseGuards(JwtAuthGuard)
  async create(
    @Param('productId') productId: string,
    @Request() req: any,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    return this.reviewsService.create(productId, req.user.userId, createReviewDto);
  }
}