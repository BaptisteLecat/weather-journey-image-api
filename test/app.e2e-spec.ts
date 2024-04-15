import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { User } from '../src/modules/users/entities/user.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('User Module', () => {
    describe('GET /users (GET)', () => {
      it('/users/:id (GET) : should return an user', () => {
        return request(app.getHttpServer())
          .get('/users/Ixt0stWixWMX1dLHKLpw1AixiAWZ')
          .expect(200)
          .expect('Content-Type', /json/)
          .expect((res) => {
            // Vérification de la structure et des types de l'objet utilisateur
            expect(res.body).toEqual(expect.objectContaining({
              email: expect.any(String),
              frequencies: expect.any(Array),
              id: expect.any(String),
              styles: expect.any(Array),
            }));
          });
      });

      it('/users/:id (GET) : should return an error if user not found', () => {
        return request(app.getHttpServer())
          .get('/users/unknown')
          .expect(404)
          .expect('Content-Type', /json/)
          .expect((res) => {
            // Vérification de la structure et des types de l'objet erreur
            expect(res.body).toEqual(expect.objectContaining({
              statusCode: expect.any(Number),
              message: expect.any(String),
            }));
          });
      });
    });
    describe('GET /users (GET)', () => {
      it('/users (GET) : should return an array of users', () => {
        return request(app.getHttpServer())
          .get('/users')
          .expect(200)
          .expect('Content-Type', /json/)
          .expect((res) => {
            // Vérification de la structure et des types de l'objet utilisateur
            expect(res.body).toEqual(expect.arrayContaining([
              expect.objectContaining({
                email: expect.any(String),
                frequencies: expect.any(Array),
                id: expect.any(String),
                styles: expect.any(Array),
              }),
            ]));
          });
      });
    });
  });
});
