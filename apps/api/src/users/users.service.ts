import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import {
  DeleteResult,
  FindOptionsWhere,
  InsertResult,
  Repository,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  create(entity: QueryDeepPartialEntity<User>): Promise<InsertResult> {
    return this.usersRepository.insert(entity);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }

  save(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }
}
