import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { forwardRef } from '@nestjs/common';
import { AuthModule } from './../auth/auth.module';

describe('User Controller', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockRepository = {
    find() {
      return {};
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => AuthModule)],
      controllers: [UsersController],
      providers: [UsersService],
    })
    .overrideProvider(getModelToken('User'))
    .useValue(mockRepository)
    .compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
