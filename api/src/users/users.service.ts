import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private nextId = 1;

  create(dto: CreateUserDto): User {
    const user: User = { id: this.nextId++, ...dto };
    this.users.push(user);
    return user;
  }

  findAll(): User[] {
    return this.users;
  }

  getUserById(id: number): User {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  updateUser(id: number, dto: UpdateUserDto): User {
    const user = this.getUserById(id);
    Object.assign(user, dto);
    return user;
  }

  deleteUser(id: number): { deleted: true } {
    this.getUserById(id); // throws 404 if missing
    this.users = this.users.filter((u) => u.id !== id);
    return { deleted: true };
  }
}