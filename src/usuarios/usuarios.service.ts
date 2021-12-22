import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuarios.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';
import { Usuarios } from '@prisma/client';

@Injectable()
export class UsuariosService {
  // eslint-disable-next-line prettier/prettier
  constructor(private prisma: PrismaService) {}
  
  async create(data: CreateUsuarioDto): Promise<Usuarios> {
    data.senha = await bcrypt.hash(data.senha, 10);
    return await this.prisma.usuarios.create({ data });
  }

  async findByLogin(login: CreateUsuarioDto): Promise<Usuarios> {
    const user = await this.prisma.usuarios.findFirst({
      where: {
        nome_usuario: login.nome_usuario,
      }
    })

    if(!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    const senhaigual = await bcrypt.compare(login.senha, user.senha);

    if(!senhaigual) {
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

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}