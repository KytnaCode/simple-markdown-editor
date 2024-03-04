import { UsersService } from './users.service';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';
import { TestBed } from '@automock/jest';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

describe('UsersService', () => {
  let service: UsersService;
  let repository: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(UsersService).compile();

    service = unit;
    repository = unitRef.get('UserRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should have a defined findAll function', () => {
      // Assert
      expect(service.findAll).toBeDefined();
    });

    it('should return a promise', () => {
      // Arrange
      const users: User[] = [
        {
          id: 1,
          password: '123',
          username: 'alex',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      repository.find.mockResolvedValue(users);

      // Act
      const result = service.findAll(); // we don't use `await` here to avoid resolving the Promise

      // Assert
      expect(result).toBeInstanceOf(Promise);
    });

    it('should return an array of users asynchronous', async () => {
      // Arrange
      const users: User[] = [
        {
          id: 1,
          updatedAt: new Date(),
          createdAt: new Date(),
          username: 'test',
          password: '123',
        },
      ];
      repository.find.mockResolvedValue(users);

      // Act
      const result = await service.findAll();

      // Assert
      expect(result).toEqual(users);
    });

    it('should call repository.find', async () => {
      // Act
      await service.findAll();

      // Assert
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should be defined', () => {
      // Assert
      expect(service.findOne).toBeDefined();
    });

    it('should return a promise', () => {
      // Arrange
      const user: User = {
        id: 1,
        password: '123',
        username: 'alex',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      repository.findOneBy.mockResolvedValue(user);

      // Act
      const result = service.findOne(1); // we don't use await here to avoid resolving the promise

      // Assert
      expect(result).toBeInstanceOf(Promise);
    });

    it('should return a user asynchronous', async () => {
      // Arrange
      const user: User = {
        id: 1,
        password: '123',
        username: 'alex',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      repository.findOneBy.mockResolvedValue(user);

      // Act
      const result = await service.findOne(1);

      // Assert
      expect(result).toEqual(user);
    });

    it('should call `repository.findOneBy`', async () => {
      // Act
      await service.findOne(1);

      // Assert
      expect(repository.findOneBy).toHaveBeenCalled();
    });

    it('should call `repository.findOneBy` with an ID', async () => {
      // Arrange
      const id = 1;

      // Act
      await service.findOne(id);

      // Assert
      expect(repository.findOneBy).toHaveBeenCalledWith({ id });
    });
  });

  describe('create', () => {
    it('should be defined', () => {
      // Assert
      expect(service.create).toBeDefined();
    });

    it('should return a promise', () => {
      // Arrange
      const expected: InsertResult = {
        identifiers: [{}],
        raw: '',
        generatedMaps: [{}],
      };
      repository.insert.mockResolvedValue(expected);

      // Act
      const got = service.create({
        password: '123',
        username: 'alex',
      });

      // Assert
      expect(got).toBeInstanceOf(Promise);
    });

    it('should return an insert result asynchronous', async () => {
      // Arrange
      const expected: InsertResult = {
        raw: '',
        identifiers: [{}],
        generatedMaps: [{}],
      };
      repository.insert.mockResolvedValue(expected);

      // Act
      const got = await service.create({
        password: '123',
        username: 'alex',
      });

      // Assert
      expect(got).toEqual(expected);
    });

    it('should call `repository.insert`', async () => {
      // Act
      await service.create({
        username: 'alex',
        password: 'password',
      });

      // Assert
      expect(repository.insert).toHaveBeenCalled();
    });

    it('should call `repository.insert` with correct params', async () => {
      // Arrange
      const user: QueryDeepPartialEntity<User> = {
        password: '123',
        username: 'alex',
      };

      // Act
      await service.create(user);

      // Assert
      expect(repository.insert).toHaveBeenCalledWith(user);
    });
  });

  describe('save', () => {
    it('should be defined', () => {
      expect(service.save).toBeDefined();
    });

    it('should return a promise', () => {
      // Arrange
      const user: User = {
        username: 'alex',
        password: '123',
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const modfiedUser: User = {
        ...user,
        username: 'new name',
      };
      repository.save.mockResolvedValue(user);

      // Act
      const got = service.save(modfiedUser);

      // Assert
      expect(got).toBeInstanceOf(Promise);
    });

    it('should return an new user asynchronous', async () => {
      // Arrange
      const user: User = {
        id: 1,
        password: '123',
        username: 'alex',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      const modfiedUser: User = {
        ...user,
        username: 'new name',
      };
      repository.save.mockResolvedValue(modfiedUser);

      // Act
      const got = await service.save(modfiedUser);

      // Assert
      expect(got).toEqual(modfiedUser);
    });

    it('should call `repository.save`', async () => {
      // Arrange
      const user: User = {
        username: 'alex',
        createdAt: new Date(),
        updatedAt: new Date(),
        password: '123',
        id: 1,
      };

      // Act
      await service.save(user);

      // Assert
      expect(repository.save).toHaveBeenCalled();
    });

    it('should call `repository.save` with correct arguments', async () => {
      // Arrange
      const user: User = {
        id: 1,
        password: '123',
        username: 'alex',
        updatedAt: new Date(),
        createdAt: new Date(),
      };

      // Act
      await service.save(user);

      // Assert
      expect(repository.save).toHaveBeenCalledWith(user);
    });
  });

  describe('delete', () => {
    it('should be defined', () => {
      // Assert
      expect(service.delete).toBeDefined();
    });

    it('should return a promise', () => {
      // Arrange
      const result: DeleteResult = {
        raw: '',
      };
      const id = 1;
      repository.delete.mockResolvedValue(result);

      // Act
      const got = service.delete(id);

      // Assert
      expect(got).toBeInstanceOf(Promise);
    });

    it('should return a result asynchronously', async () => {
      // Arrange
      const result: DeleteResult = {
        raw: '',
      };
      const id = 1;
      repository.delete.mockResolvedValue(result);

      // Act
      const got = await service.delete(id);

      // Assert
      expect(got).toEqual(result);
    });

    it('should call `repository.delete`', async () => {
      // Arrange
      const id = 1;

      // Act
      await service.delete(id);

      // Assert
      expect(repository.delete).toHaveBeenCalled();
    });

    it('should call `repository.delete` with the passed id', async () => {
      // Arrange
      const id = 1;

      // Act
      await service.delete(id);

      // Assert
      expect(repository.delete).toHaveBeenCalledWith(id);
    });
  });
});
