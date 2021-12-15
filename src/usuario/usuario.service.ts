import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsuarioService {
  // eslint-disable-next-line prettier/prettier
  constructor(private prisma: PrismaService) {}

  async createPrisma(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    return await this.prisma.usuario.create({
      data: { ...createUsuarioDto },
    });
  }

  async findAllPrisma(): Promise<Usuario[]> {
    return await this.prisma.usuario.findMany();
  }

  async findOnePrisma(id: number): Promise<Usuario> {
    return await this.prisma.usuario.findUnique({ where: { id } });
  }

  async updatePrisma(
    id: number,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<Usuario> {
    return await this.prisma.usuario.update({
      data: { ...updateUsuarioDto },
      where: { id },
    });
  }

  async removePrisma(id: number) {
    return await this.prisma.usuario.delete({ where: { id } });
  }
}