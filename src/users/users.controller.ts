import { Controller, Post, Get, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() data: { name: string; email: string; password: string }) {
    console.log("Datos recibidos:", data);

    if (!data.name || !data.email || !data.password) {
      throw new Error("Todos los campos (name, email, password) son obligatorios.");
    }

    return this.usersService.createUser(data.name, data.email, data.password);
  }

  @Get()
  async getUsers() {
    return this.usersService.getAllUsers();
  }
}
