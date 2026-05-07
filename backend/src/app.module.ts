import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './config/database.config';
import { redisConfig } from './config/redis.config';
import { stripeConfig } from './config/stripe.config';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';
import { CouponsModule } from './coupons/coupons.module';
import { ReviewsModule } from './reviews/reviews.module';
import { AddressesModule } from './addresses/addresses.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, redisConfig, stripeConfig],
    }),
    AuthModule,
    ProductsModule,
    CartModule,
    OrdersModule,
    CouponsModule,
    ReviewsModule,
    AddressesModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}