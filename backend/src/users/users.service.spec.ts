import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/users.schema';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {

    class mockUserModel {
      constructor() {}

      public static data;

      static save() {
        return this.data;
      }

      static findOne({ _id }) {
        return this.data;
      }
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, {
        provide: getModelToken('User'),
        useValue: mockUserModel,
      }],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should grrr', () => {
  });
});
