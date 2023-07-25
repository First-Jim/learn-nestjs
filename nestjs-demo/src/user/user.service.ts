import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entiry';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  find(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  async create(user: User): Promise<User> {
    const userTemp = this.userRepository.create(user);
    return this.userRepository.save(userTemp);
  }

  async remove(id: number) {
    return this.userRepository.delete(id);
  }
}
