import { registerAs } from '@nestjs/config';

export const stripeConfig = registerAs('stripe', () => ({
  secretKey: process.env.STRIPE_SECRET_KEY || '',
  apiVersion: '2023-10-16',
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
}));