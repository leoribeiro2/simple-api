import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { forwardRef } from '@nestjs/common';
import { UsersModule } from './../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { UserSchema } from './..//users/schemas/users.schema';

class DeviceServiceMock extends MongooseModule {
  async getDevices(group): Promise<any> {
    return [];
  }
}

describe('Auth Controller', () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockRepository = {
    findOne() {
      return {
        nome: 'teste',
        senha: '232323',
        email: 'teste@teste.com',
        validatePass() {
          return true;
        },
        save() {
          return this;
        },
      };
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        forwardRef(() => UsersModule),
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
      ],
    })
    .overrideProvider(getModelToken('User'))
    .useValue(mockRepository)
    .compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  it('should createToken be defined', () => {
    expect(authController.createToken).toBeDefined();
  });

  it('should create jwt token', async () => {
    const res = await authController.createToken({ email: 'teste@teste.com', senha: '232323' });
    expect(res.token).toBeTruthy();
    expect(res.user).toBeTruthy();
  });
});
