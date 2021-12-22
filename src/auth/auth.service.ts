import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './jwt.strategy';

@Injectable()
export class AuthService {
    constructor(
        // eslint-disable-next-line prettier/prettier
        private readonly usuariosService: UsuariosService,
        private readonly jwtService: JwtService,
    ) {}

    async login(loginUserDto: LoginDto) {
        const user = await this.usuariosService.findByLogin(loginUserDto);

        const token = this._createToken(user);

        return{
            nome_usuario: user.nome_usuario,
            ...token
        }
    }
 
    private _createToken({ nome }: LoginDto): any {
        const user: JwtPayload = { nome };
        const accessToken = this.jwtService.sign(user);
        return {
            expiresIn: process.env.EXPIRESIN,
            accessToken,
        }
    }
}
