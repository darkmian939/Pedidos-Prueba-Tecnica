import { Controller, Post, Get, Body } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('users') 
export class UsersController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  async createUser(@Body() data: { name: string; email: string; password: string }) {
    console.log("Datos recibidos:", data); 
    if (!data.name || !data.email || !data.password) {
      throw new Error("Todos los campos (name, email, password) son obligatorios.");
    }

    return this.prisma.user.create({
      data,
    });
  }

  @Get()
  async getUsers() {
    return this.prisma.user.findMany();
  }
}
