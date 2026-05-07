import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/api/health (GET)', () => {
    it('should return status ok', () => {
      return request(app.getHttpServer())
        .get('/api/health')
        .expect(200)
        .expect({ status: 'ok' });
    });
  });

  describe('/api/auth/register (POST)', () => {
    it('should register a new user', () => {
      return request(app.getHttpServer())
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
          name: 'Test User',
        })
        .expect(201);
    });
  });

  describe('/api/auth/login (POST)', () => {
    it('should login user', () => {
      return request(app.getHttpServer())
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
        })
        .expect(201);
    });
  });

  describe('/api/products (GET)', () => {
    it('should return products list', () => {
      return request(app.getHttpServer())
        .get('/api/products')
        .expect(200);
    });
  });

  describe('/api/categories (GET)', () => {
    it('should return categories list', () => {
      return request(app.getHttpServer())
        .get('/api/categories')
        .expect(200);
    });
  });
});