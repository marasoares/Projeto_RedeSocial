import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUsuariosDto } from './dto/create-usuarios.dto';
import { UpdateUsuariosDto } from './dto/update-usuarios.dto';
import * as bcrypt from 'bcrypt';
import { Usuarios } from '@prisma/client';

@Injectable()
export class UsuariosService {
  // eslint-disable-next-line prettier/prettier
  constructor(private prisma: PrismaService) {}
  
  async create(data: CreateUsuariosDto): Promise<Usuarios> {
    data.senha = await bcrypt.hash(data.senha, 10);
    return await this.prisma.usuarios.create({ data });
  }

  async findByLogin(login: CreateUsuariosDto): Promise<Usuarios> {
    const user = await this.prisma.usuarios.findFirst({
      where: {
        nomeUsuario: login.nomeUsuario,
      }
    })

    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    const senhaIgual = await bcrypt.compare(login.senha, user.senha);

    if (!senhaIgual) {
      throw new HttpException('Senha inválida', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  findAll() {
    return `This action returns all usuarios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuariosDto: UpdateUsuariosDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
